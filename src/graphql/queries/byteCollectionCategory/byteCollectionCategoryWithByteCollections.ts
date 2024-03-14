import {
  ByteCollection as ByteCollectionGraphql,
  CategoryWithByteCollection,
  QueryByteCollectionCategoryWithByteCollectionsArgs,
} from '@/graphql/generated/graphql';
import { getByteCollectionWithBytes } from '@/helpers/byteCollection/byteCollectionsHelper';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function byteCollectionCategoryWithByteCollections(
  _: any,
  args: QueryByteCollectionCategoryWithByteCollectionsArgs,
  context: IncomingMessage,
): Promise<CategoryWithByteCollection> {
  const byteCollectionCategory = await prisma.byteCollectionCategory.findUniqueOrThrow({
    where: {
      id: args.categoryId,
    },
  });

  const byteCollectionArr: ByteCollectionGraphql[] = [];

  for (const byteCollectionId of byteCollectionCategory.byteCollectionIds) {
    const byteCollection = await prisma.byteCollection.findFirstOrThrow({
      where: {
        spaceId: args.spaceId,
        id: byteCollectionId,
      },
      orderBy: {
        priority: 'desc',
      },
    });

    byteCollectionArr.push(await getByteCollectionWithBytes(byteCollection));
  }

  return {
    id: byteCollectionCategory.id,
    name: byteCollectionCategory.name,
    excerpt: byteCollectionCategory.excerpt,
    imageUrl: byteCollectionCategory.imageUrl,
    byteCollections: byteCollectionArr,
    creator: byteCollectionCategory.creator,
  };
}
