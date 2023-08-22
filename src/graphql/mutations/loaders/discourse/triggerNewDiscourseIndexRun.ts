import { MutationTriggerNewDiscourseIndexRunArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { DiscourseIndexRunStatus } from '@/helpers/loaders/discourse/discourseIndexRunStatus';
import { indexAllPosts } from '@/helpers/loaders/discourse/discoursePostSummary';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';

import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export default async function triggerNewDiscourseIndexRun(_: any, args: MutationTriggerNewDiscourseIndexRunArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  const spaceIntegration = await prisma.spaceIntegration.findFirstOrThrow({ where: { spaceId: args.spaceId } });

  const discourseUrl = spaceIntegration?.loadersInfo?.discourseUrl;
  if (!discourseUrl) {
    throw new Error('Discourse integration is not enabled for this space');
  }

  const discourseIndexRun = await prisma.discourseIndexRun.create({
    data: {
      id: v4(),
      spaceId: args.spaceId,
      runDate: new Date(),
      status: DiscourseIndexRunStatus.IN_PROGRESS,
    },
  });

  await indexAllPosts(discourseUrl, discourseIndexRun?.createdAt || new Date(0));

  await prisma.discourseIndexRun.update({
    where: {
      id: discourseIndexRun.id,
    },
    data: {
      status: DiscourseIndexRunStatus.SUCCESS,
    },
  });
}
