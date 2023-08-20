import { MutationTriggerDiscourseIndexRunArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { DiscourseIndexRunStatus } from '@/helpers/loaders/discourse/discourseIndexRunStatus';
import { indexAllPosts } from '@/helpers/loaders/discourse/discoursePostSummary';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';

import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function triggerDiscourseIndexRun(_: any, args: MutationTriggerDiscourseIndexRunArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);
  const discourseIndexRun = await prisma.discourseIndexRun.findFirstOrThrow({
    where: {
      spaceId: args.spaceId,
      id: args.indexRunId,
    },
  });

  await prisma.discourseIndexRun.update({
    where: {
      id: discourseIndexRun.id,
    },
    data: {
      runDate: new Date(),
      status: DiscourseIndexRunStatus.IN_PROGRESS,
    },
  });

  await indexAllPosts(discourseIndexRun.url, discourseIndexRun?.createdAt || new Date(0));

  await prisma.discourseIndexRun.update({
    where: {
      id: discourseIndexRun.id,
    },
    data: {
      runDate: new Date(),
      status: DiscourseIndexRunStatus.SUCCESS,
    },
  });
}
