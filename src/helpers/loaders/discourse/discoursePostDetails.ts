import { DiscourseThread } from '@/helpers/loaders/discourse/models';
import unionBy from 'lodash/unionBy';
import puppeteer, { Page } from 'puppeteer';

const DISCOURSE_SELECTORS = {
  POST_CONTENT_SELECTOR: 'div.topic-post',
  CONTENT_SELECTOR: 'div.cooked',
  ID_SELECTOR: 'article[id]',
  AUTHOR_SELECTOR: 'div.names span.username a',
};

export interface PostTopic {
  content: string;
  id: string;
  author: string;
}
export async function getPostDetails(page: Page): Promise<PostTopic[]> {
  const elements: PostTopic[] = [];

  let previousScrollHeight = -1;
  let currentScrollHeight = await page.evaluate(() => document.body.scrollHeight);

  while (previousScrollHeight !== currentScrollHeight) {
    const newElements = await page.$$eval(
      DISCOURSE_SELECTORS.POST_CONTENT_SELECTOR,
      (topics, contentSelector, idSelector, authorSelector: string) => {
        const localElements: PostTopic[] = [];

        topics.forEach((topic: Element) => {
          const content = topic.querySelector(contentSelector);
          const idValue = topic.querySelector(idSelector);
          const author = topic.querySelector(authorSelector)?.textContent;

          localElements.push({ content: content?.textContent!, id: idValue?.attributes?.getNamedItem('data-post-id')?.value!, author: author! });
        });

        return localElements;
      },
      DISCOURSE_SELECTORS.CONTENT_SELECTOR,
      DISCOURSE_SELECTORS.ID_SELECTOR,
      DISCOURSE_SELECTORS.AUTHOR_SELECTOR,
    );

    elements.push(...newElements);

    await page.evaluate(`window.scrollBy(0, ${currentScrollHeight})`); // Scroll to the current bottom
    await page.waitForTimeout(1000); // You can adjust this delay as required to wait for new content to load

    previousScrollHeight = currentScrollHeight;
    currentScrollHeight = await page.evaluate(() => document.body.scrollHeight);
  }

  return elements;
}

export async function indexAllPosts(): Promise<void> {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://gov.uniswap.org/t/what-do-you-think-of-the-initial-airdrop/11164');
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  const postTopics = await getPostDetails(page);
  console.log('postTopics', postTopics);

  await browser.close();
}

indexAllPosts();
