import { logError } from '@/helpers/errorLogger';
import { PostIndexingStatus } from '@/helpers/loaders/discourse/postIndexingStatus';
import { PostTopic } from '@/helpers/loaders/discourse/scrapeDiscoursePostDetails';
import { indexDiscourseCommentInPinecone } from '@/helpers/vectorIndexers/discourse/indexDiscourseCommentInPinecone';
import { indexDiscoursePostInPinecone } from '@/helpers/vectorIndexers/discourse/indexDiscoursePostInPinecone';
import { initPineconeClient } from '@/helpers/vectorIndexers/pineconeHelper';
import { prisma } from '@/prisma';
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';
import { DiscoursePost } from '@prisma/client';
import unionBy from 'lodash/unionBy';
import { v4 } from 'uuid';

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
  await indexDiscourseCommentInPinecone(index, post, upsertedComment, commentIndex);
}

export async function storeScrappedPostDetailsInDBAndPinecone(post: DiscoursePost, postTopics: PostTopic[]): Promise<void> {
  const mainPost = postTopics.find((post) => post.id === 'post_1');

  const upsertedPost = await prisma.discoursePost.update({
    where: {
      id: post.id,
    },
    data: {
      fullContent: mainPost?.content,
      indexedAt: new Date(),
      status: PostIndexingStatus.STARTED_INDEXING,
    },
  });

  const index = await initPineconeClient();
  await indexDiscoursePostInPinecone(upsertedPost, index);

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
      status: PostIndexingStatus.INDEXING_SUCCESS,
    },
  });
}
