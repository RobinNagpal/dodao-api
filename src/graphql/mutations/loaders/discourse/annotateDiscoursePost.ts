import { MutationAnnotateDiscoursePostArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { scrapeAndIndexDiscoursePost } from '@/helpers/loaders/discourse/scrapeAndIndexDiscoursePost';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function annotateDiscoursePost(_: any, args: MutationAnnotateDiscoursePostArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  const updatedPost = await prisma.discoursePost.update({
    where: {
      id: args.input.postId,
    },
    data: {
      enacted: args.input.enacted,
      discussed: args.input.discussed,
    },
  });

  scrapeAndIndexDiscoursePost(args.spaceId, updatedPost.id);
  return updatedPost;
}
