import { PostStatus } from '@/helpers/loaders/discourse/models';
import { indexDocsInPinecone } from '@/helpers/vectorIndexers/indexDocsInPinecone';
import { initPineconeClient } from '@/helpers/vectorIndexers/pineconeHelper';
import { split } from '@/helpers/vectorIndexers/splitter';
import { prisma } from '@/prisma';
import { PageMetadata } from '@/types/chat/projectsContents';
import { DiscoursePost } from '@prisma/client';
import unionBy from 'lodash/unionBy';
import { Page } from 'puppeteer';
import { v4 } from 'uuid';
import { Document as LGCDocument } from 'langchain/document';

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
export async function getPostDetails(page: Page, post: DiscoursePost): Promise<PostTopic[]> {
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

export async function storePostDetails(post: DiscoursePost, postTopics: PostTopic[]): Promise<void> {
  const mainPost = postTopics.find((post) => post.id === 'post_1');

  await prisma.discoursePost.update({
    where: {
      id: post.id,
    },
    data: {
      fullContent: mainPost?.content,
      indexedAt: new Date(),
      status: PostStatus.STARTED_INDEXING,
    },
  });

  const metadata: Omit<PageMetadata, 'chunk'> = {
    url: post.url,
    fullContent: mainPost?.content || '',
    source: post.url,
  };

  const postDocument: LGCDocument<Omit<PageMetadata, 'chunk'>> = {
    pageContent: mainPost?.content || '',
    metadata,
  };

  const comments = postTopics.filter((post) => post.id !== 'post_1');

  console.log('Upserting comments', JSON.stringify(comments, null, 2));

  for (const comment of comments) {
    console.log('Upserting comment', JSON.stringify(comment));
    await prisma.discoursePostComment.upsert({
      where: {
        commentPostId_postId: {
          postId: post.id,
          commentPostId: comment.id,
        },
      },
      update: {
        content: comment.content,
        author: comment.author,
        datePublished: new Date(comment.commentDate),
        indexedAt: new Date(),
        createdAt: new Date(),
      },
      create: {
        id: v4(),
        commentPostId: comment.id,
        spaceId: post.spaceId,
        content: comment.content,
        author: comment.author,
        datePublished: new Date(comment.commentDate),
        indexedAt: new Date(),
        createdAt: new Date(),
        postId: post.id,
      },
    });
  }
  await prisma.discoursePost.update({
    where: {
      id: post.id,
    },
    data: {
      fullContent: mainPost?.content,
      indexedAt: new Date(),
      status: PostStatus.INDEXING_SUCCESS,
    },
  });

  const commentDocuments: LGCDocument<Omit<PageMetadata, 'chunk'>>[] = comments.map((comment, index) => {
    const url = `${post.url}/${index + 2}}`;
    const metadata: Omit<PageMetadata, 'chunk'> = {
      url: url,
      fullContent: comment.content,
      source: url,
    };

    return {
      pageContent: comment.content,
      metadata,
    };
  });

  const allDocuments = [postDocument, ...commentDocuments];

  const splitDocs = await split(allDocuments);
  const index = await initPineconeClient();
  await indexDocsInPinecone(splitDocs, index, post.spaceId);
}
