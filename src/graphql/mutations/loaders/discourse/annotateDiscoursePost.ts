import { MutationAnnotateDiscoursePostArgs, MutationIndexDiscoursePostArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { indexDiscoursePostInDB } from '@/helpers/loaders/discourse/indexDiscoursePostInDB';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function annotateDiscoursePost(_: any, args: MutationAnnotateDiscoursePostArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  return prisma.discoursePost.update({
    where: {
      id: args.input.postId,
    },
    data: {
      categories: args.input.categories,
      subCategories: args.input.subCategories,
      enacted: args.input.enacted,
      discussed: args.input.discussed,
    },
  });
}
