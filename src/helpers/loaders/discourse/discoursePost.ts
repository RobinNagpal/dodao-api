import { autoScroll } from '@/helpers/loaders/discourse/autoScroll';
import { DiscourseThread } from '@/helpers/loaders/discourse/models';
import { prisma } from '@/prisma';
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

export async function getFilteredPostHrefs(page: Page, lastRunTime: number): Promise<PostInfo[]> {
  return await page.$$eval(
    DISCOURSE_SELECTORS.POST_SELECTOR,
    (topics, hrefSubSelector, timeSubSelector, lastRunTime) => {
      const elements: PostInfo[] = [];

      topics.forEach((topic: Element) => {
        const timeElement = topic.querySelector(timeSubSelector);
        const dataTimeAttr = timeElement ? (timeElement as HTMLElement).getAttribute('data-time') : null;
        const epochTime = dataTimeAttr ? parseInt(dataTimeAttr) : null;

        // if (epochTime && epochTime >= lastRunTime) {
        const hrefElement = topic.querySelector(hrefSubSelector) as HTMLAnchorElement | null;
        elements.push({ href: hrefElement?.href!, title: hrefElement?.text!, epochTime: new Date(epochTime!).toISOString() });
        // }
      });

      return elements;
    },
    DISCOURSE_SELECTORS.HREF_SUB_SELECTOR,
    DISCOURSE_SELECTORS.TIME_SUB_SELECTOR,
    lastRunTime,
  );
}

export async function indexAllPosts(discourseUrl: string, lastRunDate: Date): Promise<DiscourseThread[]> {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(discourseUrl);
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await autoScroll(page, 50600);

  const lastRunTime = lastRunDate.getTime();
  const hrefs: PostInfo[] = await getFilteredPostHrefs(page, lastRunTime);
  console.log('hrefs', hrefs);

  await prisma.discoursePost.createMany({
    data: hrefs.map((href) => ({
      id: v4(),
      url: href.href!,
      datePublished: new Date(href.epochTime),
      createdAt: new Date(),
      spaceId: 'dodao-test',
      status: 'NEW',
      title: href.title,
    })),
  });

  const allPageContents: DiscourseThread[] = [];

  await browser.close();

  return allPageContents;
}
