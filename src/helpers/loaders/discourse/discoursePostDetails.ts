import { logError } from '@/helpers/errorLogger';
import { PostStatus } from '@/helpers/loaders/discourse/models';
import { deleteDocWithUrlInPinecone, indexDocsInPinecone } from '@/helpers/vectorIndexers/indexDocsInPinecone';
import { initPineconeClient } from '@/helpers/vectorIndexers/pineconeHelper';
import { split } from '@/helpers/vectorIndexers/splitter';
import { prisma } from '@/prisma';
import { DocumentInfoType, PageMetadata } from '@/types/chat/projectsContents';
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';
import { DiscoursePost } from '@prisma/client';
import { Document as LGCDocument } from 'langchain/document';
import unionBy from 'lodash/unionBy';
import { Page } from 'puppeteer';
import { v4 } from 'uuid';

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

async function indexPostComment(post: DiscoursePost, comment: PostTopic, commentIndex: number, index: VectorOperationsApi) {
  const upsertedComment = await prisma.discoursePostComment.upsert({
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

  const url = `${post.url}/${commentIndex + 2}}`;

  console.log(`Upserting comment in pinecone  ${url} `);

  const metadata: PageMetadata = {
    url: url,
    fullContentId: upsertedComment.id,
    documentType: DocumentInfoType.DISCOURSE_COMMENT,
  };

  const commentDocuments: LGCDocument<PageMetadata> = {
    pageContent: comment.content,
    metadata,
  };
  await deleteDocWithUrlInPinecone(metadata.url, index, post.spaceId);

  const splitDocs = await split([commentDocuments]);

  await indexDocsInPinecone(splitDocs, index, post.spaceId);
}

async function indexPostDocument(post: DiscoursePost, index: VectorOperationsApi) {
  const metadata: PageMetadata = {
    url: post.url,
    fullContentId: post.id,
    documentType: DocumentInfoType.DISCOURSE_POST,
  };

  const postDocument: LGCDocument<PageMetadata> = {
    pageContent: post.fullContent || '',
    metadata,
  };

  console.log(`Upserting post in pinecone  ${post.url}`);
  await deleteDocWithUrlInPinecone(metadata.url, index, post.spaceId);

  const splitDocs = await split([postDocument]);

  await indexDocsInPinecone(splitDocs, index, post.spaceId);
}

export async function storePostDetails(post: DiscoursePost, postTopics: PostTopic[]): Promise<void> {
  const mainPost = postTopics.find((post) => post.id === 'post_1');

  const upsertedPost = await prisma.discoursePost.update({
    where: {
      id: post.id,
    },
    data: {
      fullContent: mainPost?.content,
      indexedAt: new Date(),
      status: PostStatus.STARTED_INDEXING,
    },
  });

  const index = await initPineconeClient();
  await indexPostDocument(upsertedPost, index);

  const comments = postTopics.filter((post) => post.id !== 'post_1');
  const uniqueComments = unionBy(comments, 'id');

  let commentIndex = 0;

  for (const comment of uniqueComments) {
    try {
      await indexPostComment(post, comment, commentIndex, index);
    } catch (e: any) {
      logError(`Unable to index comment for post ${post.url}`, {}, e);
    }
    commentIndex++;
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
}
