import { MutationUpdateSpaceCreatorArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateSpaceCreator(_: unknown, args: MutationUpdateSpaceCreatorArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);
  checkEditSpacePermission(spaceById, context);
  return prisma.space.update({
    data: {
      creator: args.creator,
    },
    where: {
      id: args.spaceId,
    },
  });
}
