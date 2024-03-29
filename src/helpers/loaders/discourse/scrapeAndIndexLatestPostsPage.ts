import { PostIndexingStatus } from '@/helpers/loaders/discourse/postIndexingStatus';
import { scrapeDiscoursePostDetails } from '@/helpers/loaders/discourse/scrapeDiscoursePostDetails';
import { setupPuppeteerPageForDiscourse } from '@/helpers/loaders/discourse/helper/setupPuppeteerPageForDiscourse';
import { storeScrappedPostDetailsInDBAndPinecone } from '@/helpers/loaders/discourse/storeScrappedPostDetailsInDBAndPinecone';
import { prisma } from '@/prisma';
import difference from 'lodash/difference';
import unionBy from 'lodash/unionBy';
import { Page } from 'puppeteer';
import { v4 } from 'uuid';

const DISCOURSE_SELECTORS = {
  POST_SELECTOR: 'table.topic-list  tr.topic-list-item',
  HREF_SUB_SELECTOR: 'td.main-link > span > a',
  TIME_SUB_SELECTOR: 'td.topic-list-data > a > span[data-time]',
};

export interface PostInfo {
  href: string;
  epochTime: string;
  title: string;
}

async function getSummaryOfAllPosts(page: Page): Promise<PostInfo[]> {
  let elements: PostInfo[] = [];

  let previousScrollHeight = -1;
  let currentScrollHeight = await page.evaluate(() => document.body.scrollHeight);

  while (previousScrollHeight !== currentScrollHeight) {
    const newElements = await page.$$eval(
      DISCOURSE_SELECTORS.POST_SELECTOR,
      (topics, hrefSubSelector, timeSubSelector) => {
        const localElements: PostInfo[] = [];

        topics.forEach((topic: Element) => {
          const timeElement = topic.querySelector(timeSubSelector);
          const dataTimeAttr = timeElement ? (timeElement as HTMLElement).getAttribute('data-time') : null;
          const epochTime = dataTimeAttr ? parseInt(dataTimeAttr) : null;

          const hrefElement = topic.querySelector(hrefSubSelector) as HTMLAnchorElement | null;

          if (!hrefElement?.href || !hrefElement?.text || !epochTime) {
            throw new Error('Href, title or epochTime not found');
          }

          localElements.push({
            href: hrefElement.href,
            title: hrefElement.text,
            epochTime: new Date(epochTime).toISOString(),
          });
        });

        return localElements;
      },
      DISCOURSE_SELECTORS.HREF_SUB_SELECTOR,
      DISCOURSE_SELECTORS.TIME_SUB_SELECTOR,
    );

    const newElementsHrefs = difference(
      newElements.map((e) => e.href),
      elements.map((e) => e.href),
    );

    console.log('Adding new posts:', JSON.stringify(newElementsHrefs, null, 2));
    elements.push(...newElements);
    elements = unionBy(elements, 'href');

    await page.evaluate(`window.scrollBy(0, ${currentScrollHeight})`); // Scroll to the current bottom
    await page.waitForTimeout(1000); // You can adjust this delay as required to wait for new content to load

    previousScrollHeight = currentScrollHeight;
    currentScrollHeight = await page.evaluate(() => document.body.scrollHeight);
  }

  return unionBy(elements, 'href');
}

export async function scrapeAndIndexLatestPostsPage(discourseUrl: string, spaceId: string, lastRunDate: Date): Promise<void> {
  const { browser, page } = await setupPuppeteerPageForDiscourse(discourseUrl);

  const hrefs: PostInfo[] = await getSummaryOfAllPosts(page);

  for (const href of hrefs) {
    await prisma.discoursePost.upsert({
      where: {
        url: href.href!,
      },
      update: {
        datePublished: new Date(href.epochTime),
        status: lastRunDate <= new Date(href.epochTime) ? PostIndexingStatus.NEEDS_INDEXING : PostIndexingStatus.INDEXING_SUCCESS,
      },
      create: {
        id: v4(),
        url: href.href!,
        datePublished: new Date(href.epochTime),
        createdAt: new Date(),
        spaceId,
        status: PostIndexingStatus.NEEDS_INDEXING,
        title: href.title,
      },
    });
  }

  const dbPosts = await prisma.discoursePost.findMany({
    where: {
      spaceId,
    },
  });

  for (const post of dbPosts) {
    console.log('going to', post.url);
    if (post.status === PostIndexingStatus.NEEDS_INDEXING) {
      try {
        const postTopics = await scrapeDiscoursePostDetails(page, post);
        await storeScrappedPostDetailsInDBAndPinecone(post, postTopics);
      } catch (e) {
        console.error(e);
        await prisma.discoursePost.update({
          where: {
            id: post.id,
          },
          data: {
            status: PostIndexingStatus.INDEXING_FAILED,
          },
        });
      }
    }
  }

  await browser.close();
}
