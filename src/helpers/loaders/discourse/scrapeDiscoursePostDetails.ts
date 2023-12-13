import { DiscoursePost } from '@prisma/client';
import unionBy from 'lodash/unionBy';
import { Page } from 'puppeteer';

const DISCOURSE_SELECTORS = {
  POST_CONTENT_SELECTOR: 'div.topic-post',
  CONTENT_SELECTOR: 'div.cooked',
  ID_SELECTOR: 'article[id]',
  AUTHOR_SELECTOR: 'div.names span.username a',
  POST_DATE_SELECTOR: 'a.post-date span[data-time]',
};

export interface PostTopic {
  content: string;
  id: string;
  author: string;
  commentDate: string;
}

export async function scrapeDiscoursePostDetails(page: Page, post: DiscoursePost): Promise<PostTopic[]> {
  await page.goto(post.url);
  const elements: PostTopic[] = [];

  let previousScrollHeight = -1;
  let currentScrollHeight = await page.evaluate(() => document.body.scrollHeight);

  while (previousScrollHeight !== currentScrollHeight) {
    const newElements = await page.$$eval(
      DISCOURSE_SELECTORS.POST_CONTENT_SELECTOR,
      (topics, contentSelector, idSelector, authorSelector: string, postDateSelector) => {
        const localElements: PostTopic[] = [];

        topics.forEach((topic: Element) => {
          try {
            const content = topic.querySelector(contentSelector);
            const idValue = topic.querySelector(idSelector);
            const author = topic.querySelector(authorSelector)?.textContent;

            const postId = idValue?.attributes?.getNamedItem('id')?.value;

            const dataTimeAttr = topic.querySelector(postDateSelector)?.getAttribute('data-time');
            const epochTime = dataTimeAttr ? parseInt(dataTimeAttr) : null;

            if (!content?.textContent || !postId || !author || !epochTime) {
              return;
            }

            localElements.push({
              content: content.textContent,
              id: postId,
              author: author,
              commentDate: new Date(epochTime).toISOString(),
            });
          } catch (error) {
            console.log('Error', error);
          }
        });

        return localElements;
      },
      DISCOURSE_SELECTORS.CONTENT_SELECTOR,
      DISCOURSE_SELECTORS.ID_SELECTOR,
      DISCOURSE_SELECTORS.AUTHOR_SELECTOR,
      DISCOURSE_SELECTORS.POST_DATE_SELECTOR,
    );

    elements.push(...newElements);

    await page.evaluate(`window.scrollBy(0, ${currentScrollHeight})`); // Scroll to the current bottom
    await page.waitForTimeout(1000); // You can adjust this delay as required to wait for new content to load

    previousScrollHeight = currentScrollHeight;
    currentScrollHeight = await page.evaluate(() => document.body.scrollHeight);
  }

  return unionBy(elements, 'id');
}
