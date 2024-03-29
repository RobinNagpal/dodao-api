import { QueryDiscourseIndexRunsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function discoursePosts(_: any, args: QueryDiscourseIndexRunsArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);
  return prisma.discoursePost.findMany({
    where: {
      spaceId: args.spaceId,
    },
    orderBy: {
      datePublished: 'desc',
    },
  });
}
