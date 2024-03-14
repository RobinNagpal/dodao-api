import { MutationUpsertByteCollectionCategoryArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission, checkSpaceIdAndSpaceInEntityAreSame } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertByteCollectionCategory(_: any, args: MutationUpsertByteCollectionCategoryArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.input.spaceId);

  checkSpaceIdAndSpaceInEntityAreSame(args.spaceId, args.input.spaceId);
  const user = checkEditSpacePermission(spaceById, context);

  const byteCollectionCategory = await prisma.byteCollectionCategory.upsert({
    where: {
      id: args.input.id,
    },
    create: {
      id: args.input.id,
      name: args.input.name,
      spaceId: args.input.spaceId,
      byteCollectionIds: args.input.byteCollectionIds,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: args.input.imageUrl,
      creator: user.username,
      excerpt: args.input.excerpt,
    },
    update: {
      name: args.input.name,
      byteCollectionIds: args.input.byteCollectionIds,
      updatedAt: new Date(),
      imageUrl: args.input.imageUrl,
      excerpt: args.input.excerpt,
    },
  });

  return byteCollectionCategory;
}
