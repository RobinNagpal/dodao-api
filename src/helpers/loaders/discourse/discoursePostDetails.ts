import { PostStatus } from '@/helpers/loaders/discourse/models';
import { prisma } from '@/prisma';
import { DiscoursePost } from '@prisma/client';
import unionBy from 'lodash/unionBy';
import puppeteer, { Page } from 'puppeteer';
import { v4 } from 'uuid';

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
export async function getPostDetails(page: Page, post: DiscoursePost): Promise<PostTopic[]> {
  await page.goto(post.url);
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

          const postId = idValue?.attributes?.getNamedItem('id')?.value;

          if (!content?.textContent || !postId || !author) {
            throw new Error('Content, id or author not found :' + post.url);
          }

          localElements.push({ content: content.textContent, id: postId, author: author });
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

  return unionBy(elements, 'id');
}

export async function storePostDetails(post: DiscoursePost, postTopics: PostTopic[]): Promise<void> {
  const mainPost = postTopics.find((post) => post.id === 'post_1');

  if (!mainPost) {
    throw new Error('Main post not found');
  }

  await prisma.discoursePost.update({
    where: {
      id: post.id,
    },
    data: {
      fullContent: mainPost.content,
      indexedAt: new Date(),
      status: PostStatus.STARTED_INDEXING,
    },
  });

  const comments = postTopics.filter((post) => post.id !== 'post_1');

  await prisma.discoursePostComment.createMany({
    data: comments.map((comment) => ({
      id: v4(),
      commentPostId: comment.id,
      spaceId: 'dodao-test',
      content: comment.content,
      author: comment.author,
      datePublished: new Date(),
      indexedAt: new Date(),
      createdAt: new Date(),
      postId: post.id,
    })),
  });

  await prisma.discoursePost.update({
    where: {
      id: post.id,
    },
    data: {
      fullContent: mainPost.content,
      indexedAt: new Date(),
      status: PostStatus.INDEXING_SUCCESS,
    },
  });
}
