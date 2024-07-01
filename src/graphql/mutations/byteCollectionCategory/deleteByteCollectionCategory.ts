import { QueryByteCollectionCategoryWithByteCollectionsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteByteCollection(_: any, args: QueryByteCollectionCategoryWithByteCollectionsArgs, context: IncomingMessage) {
  const byteCollectionCategory = await prisma.byteCollectionCategory.findUniqueOrThrow({
    where: {
      id: args.categoryId,
    },
  });

  const spaceById = await getSpaceById(byteCollectionCategory.spaceId);

  checkEditSpacePermission(spaceById, context);

  await prisma.byteCollectionCategory.delete({
    where: {
      id: args.categoryId,
    },
  });

  return true;
}
