import { MutationIndexNeedsIndexingDiscoursePostsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { DiscourseIndexRunStatus } from '@/helpers/loaders/discourse/discourseIndexRunStatus';
import { getPostDetails, storePostDetailsInPinecone } from '@/helpers/loaders/discourse/discoursePostDetails';
import { setupPuppeteerPageForDiscourse } from '@/helpers/loaders/discourse/discoursePostSummary';
import { PostStatus } from '@/helpers/loaders/discourse/models';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';

import { prisma } from '@/prisma';
import { DiscourseIndexRun, DiscoursePost } from '@prisma/client';
import { IncomingMessage } from 'http';
import { Page } from 'puppeteer';
import { v4 } from 'uuid';

async function indexDBPosts(dbPosts: DiscoursePost[], page: Page, newIndexRun: DiscourseIndexRun) {
  for (const post of dbPosts) {
    console.log('going to', post.url);

    try {
      const postTopics = await getPostDetails(page, post);
      await storePostDetailsInPinecone(post, postTopics);
    } catch (e) {
      console.error(e);
      await prisma.discoursePost.update({
        where: {
          id: post.id,
        },
        data: {
          status: PostStatus.INDEXING_FAILED,
        },
      });
    }
  }

  await prisma.discourseIndexRun.update({
    where: {
      id: newIndexRun.id,
    },
    data: {
      status: DiscourseIndexRunStatus.SUCCESS,
    },
  });
}

export default async function indexNeedsIndexingDiscoursePosts(_: any, args: MutationIndexNeedsIndexingDiscoursePostsArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  const spaceIntegration = await prisma.spaceIntegration.findFirstOrThrow({ where: { spaceId: args.spaceId } });

  const discourseUrl = spaceIntegration?.loadersInfo?.discourseUrl;
  if (!discourseUrl) {
    throw new Error('Discourse integration is not enabled for this space');
  }

  const newIndexRun = await prisma.discourseIndexRun.create({
    data: {
      id: v4(),
      spaceId: args.spaceId,
      runDate: new Date(),
      status: DiscourseIndexRunStatus.IN_PROGRESS,
    },
  });

  const dbPosts = await prisma.discoursePost.findMany({
    where: {
      spaceId: args.spaceId,
      status: PostStatus.NEEDS_INDEXING,
    },
  });

  console.log(`${dbPosts.length} dbPosts needs indexing`);
  const { page } = await setupPuppeteerPageForDiscourse(discourseUrl);
  indexDBPosts(dbPosts, page, newIndexRun);
  return newIndexRun;
}