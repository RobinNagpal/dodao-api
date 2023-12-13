import { MutationIndexNeedsIndexingDiscoursePostsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { logError } from '@/helpers/errorLogger';
import { DiscourseIndexRunStatus } from '@/helpers/loaders/discourse/discourseIndexRunStatus';
import { setupPuppeteerPageForDiscourse } from '@/helpers/loaders/discourse/helper/setupPuppeteerPageForDiscourse';
import { storeScrappedPostDetailsInDBAndPinecone } from '@/helpers/loaders/discourse/storeScrappedPostDetailsInDBAndPinecone';
import { PostIndexingStatus } from '@/helpers/loaders/discourse/postIndexingStatus';
import { scrapeDiscoursePostDetails } from '@/helpers/loaders/discourse/scrapeDiscoursePostDetails';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { indexDiscourseCommentInPinecone } from '@/helpers/vectorIndexers/discourse/indexDiscourseCommentInPinecone';
import { indexDiscoursePostInPinecone } from '@/helpers/vectorIndexers/discourse/indexDiscoursePostInPinecone';
import { initPineconeClient } from '@/helpers/vectorIndexers/pineconeHelper';

import { prisma } from '@/prisma';
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';
import { DiscourseIndexRun, DiscoursePost } from '@prisma/client';
import { IncomingMessage } from 'http';
import unionBy from 'lodash/unionBy';
import { Page } from 'puppeteer';
import { v4 } from 'uuid';

async function updateIndexWithPostsFromDB(dbPosts: DiscoursePost[], index: VectorOperationsApi) {
  for (const post of dbPosts) {
    await indexDiscoursePostInPinecone(post, index);

    let commentIndex = 0;

    const comments = await prisma.discoursePostComment.findMany({
      where: {
        postId: post.id,
      },
      orderBy: {
        commentPostId: 'asc',
      },
    });
    for (const comment of comments) {
      try {
        await indexDiscourseCommentInPinecone(index, post, comment, commentIndex);
      } catch (e: any) {
        logError(`Unable to index comment for post ${post.url}`, {}, e);
      }
      commentIndex++;
    }
  }
}

export default async function updateIndexWithAllDiscordPosts(_: any, args: MutationIndexNeedsIndexingDiscoursePostsArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  const dbPosts = await prisma.discoursePost.findMany({
    where: {
      spaceId: args.spaceId,
    },
  });

  const index = await initPineconeClient();
  updateIndexWithPostsFromDB(dbPosts, index);

  return true;
}
