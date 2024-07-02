import { QueryByteCollectionCategoryWithByteCollectionsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteByteCollection(_: any, args: QueryByteCollectionCategoryWithByteCollectionsArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);

  checkEditSpacePermission(spaceById, context);

  const byteCollectionCategory = await prisma.byteCollectionCategory.findUniqueOrThrow({
    where: {
      id: args.categoryId,
    },
  });

  await prisma.byteCollectionCategory.delete({
    where: {
      id: args.categoryId,
    },
  });

  return true;
}
