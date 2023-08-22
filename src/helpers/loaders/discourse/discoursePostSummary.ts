import { getPostDetails, storePostDetails } from '@/helpers/loaders/discourse/discoursePostDetails';
import { PostStatus } from '@/helpers/loaders/discourse/models';
import { prisma } from '@/prisma';
import unionBy from 'lodash/unionBy';
import puppeteer, { Page } from 'puppeteer';
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

export async function getSummaryOfAllPosts(page: Page, lastRunTime: number): Promise<PostInfo[]> {
  const elements: PostInfo[] = [];

  let previousScrollHeight = -1;
  let currentScrollHeight = await page.evaluate(() => document.body.scrollHeight);

  while (previousScrollHeight !== currentScrollHeight) {
    const newElements = await page.$$eval(
      DISCOURSE_SELECTORS.POST_SELECTOR,
      (topics, hrefSubSelector, timeSubSelector, lastRunTime) => {
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
      lastRunTime,
    );

    elements.push(...newElements);

    await page.evaluate(`window.scrollBy(0, ${currentScrollHeight})`); // Scroll to the current bottom
    await page.waitForTimeout(1000); // You can adjust this delay as required to wait for new content to load

    previousScrollHeight = currentScrollHeight;
    currentScrollHeight = await page.evaluate(() => document.body.scrollHeight);
  }

  return unionBy(elements, 'href');
}

export async function indexAllPosts(discourseUrl: string, spaceId: string, lastRunDate: Date): Promise<void> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(discourseUrl);
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  const lastRunTime = lastRunDate.getTime();
  const hrefs: PostInfo[] = await getSummaryOfAllPosts(page, lastRunTime);

  for (const href of hrefs) {
    await prisma.discoursePost.upsert({
      where: {
        url: href.href!,
      },
      update: {
        datePublished: new Date(href.epochTime),
        status: PostStatus.NEEDS_INDEXING,
      },
      create: {
        id: v4(),
        url: href.href!,
        datePublished: new Date(href.epochTime),
        createdAt: new Date(),
        spaceId,
        status: PostStatus.NEEDS_INDEXING,
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

    const postTopics = await getPostDetails(page, post);
    await storePostDetails(post, postTopics);
  }

  await browser.close();
}
