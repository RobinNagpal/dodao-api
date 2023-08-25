import { QueryDiscoursePostCommentsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function discoursePostComments(_: any, args: QueryDiscoursePostCommentsArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);
  return prisma.discoursePostComment.findMany({
    where: {
      spaceId: args.spaceId,
      postId: args.postId,
    },
    orderBy: {
      datePublished: 'desc',
    },
  });
}
