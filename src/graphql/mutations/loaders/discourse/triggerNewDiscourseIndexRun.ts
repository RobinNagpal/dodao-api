import { MutationTriggerNewDiscourseIndexRunArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { DiscourseIndexRunStatus } from '@/helpers/loaders/discourse/discourseIndexRunStatus';
import { scrapeAndIndexLatestPostsPage } from '@/helpers/loaders/discourse/scrapeAndIndexLatestPostsPage';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';

import { prisma } from '@/prisma';
import { DiscourseIndexRun } from '@prisma/client';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

async function indexAllDiscoursePosts(discourseUrl: string, spaceId: string, newIndexRun: DiscourseIndexRun, lastIndexRun: DiscourseIndexRun | null) {
  await scrapeAndIndexLatestPostsPage(discourseUrl, spaceId, lastIndexRun?.runDate || new Date(0));

  await prisma.discourseIndexRun.update({
    where: {
      id: newIndexRun.id,
    },
    data: {
      status: DiscourseIndexRunStatus.SUCCESS,
    },
  });
}

export default async function triggerNewDiscourseIndexRun(_: any, args: MutationTriggerNewDiscourseIndexRunArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  const spaceIntegration = await prisma.spaceIntegration.findFirstOrThrow({ where: { spaceId: args.spaceId } });

  const discourseUrl = spaceIntegration?.loadersInfo?.discourseUrl;
  if (!discourseUrl) {
    throw new Error('Discourse integration is not enabled for this space');
  }

  const lastIndexRun = await prisma.discourseIndexRun.findFirst({
    where: {
      spaceId: args.spaceId,
    },
    orderBy: {
      runDate: 'desc',
    },
  });
  const newIndexRun = await prisma.discourseIndexRun.create({
    data: {
      id: v4(),
      spaceId: args.spaceId,
      runDate: new Date(),
      status: DiscourseIndexRunStatus.IN_PROGRESS,
    },
  });

  indexAllDiscoursePosts(discourseUrl, space.id, newIndexRun, lastIndexRun);

  return newIndexRun;
}
