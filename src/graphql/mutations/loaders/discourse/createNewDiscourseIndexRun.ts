import { MutationCreateNewDiscourseIndexRunArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { DiscourseIndexRunStatus } from '@/helpers/loaders/discourse/discourseIndexRunStatus';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';

import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export default async function createNewDiscourseIndexRun(_: any, args: MutationCreateNewDiscourseIndexRunArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);
  return prisma.discourseIndexRun.create({
    data: {
      id: v4(),
      url: args.input.url,
      spaceId: args.spaceId,
      createdAt: new Date(),
      status: DiscourseIndexRunStatus.NEW,
    },
  });
}
