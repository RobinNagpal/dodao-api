import { QueryByteCollectionCategoryWithByteCollectionsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteByteCollection(_: any, args: QueryByteCollectionCategoryWithByteCollectionsArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);

  checkEditSpacePermission(spaceById, context);

  try {
    const UpdatedbyteCollectionCategory = await prisma.byteCollectionCategory.update({
      where: {
        id: args.categoryId,
      },
      data: {
        archive: true,
      },
    });

    return UpdatedbyteCollectionCategory;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
