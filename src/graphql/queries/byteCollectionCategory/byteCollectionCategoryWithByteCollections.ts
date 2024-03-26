import {
  ByteCollection as ByteCollectionGraphql,
  CategoryWithByteCollection,
  QueryByteCollectionCategoryWithByteCollectionsArgs,
} from '@/graphql/generated/graphql';
import { getByteCollectionWithBytes } from '@/helpers/byteCollection/byteCollectionsHelper';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export async function getByteCollectionCategoryWithByteCollections(spaceId: string, categoryId: string) {
  const byteCollectionCategory = await prisma.byteCollectionCategory.findUniqueOrThrow({
    where: {
      id: categoryId,
    },
  });

  const byteCollectionArr: ByteCollectionGraphql[] = [];

  for (const byteCollectionId of byteCollectionCategory.byteCollectionIds) {
    const byteCollection = await prisma.byteCollection.findFirstOrThrow({
      where: {
        spaceId: spaceId,
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
    status: byteCollectionCategory.status,
  };
}

export default async function byteCollectionCategoryWithByteCollections(
  _: any,
  args: QueryByteCollectionCategoryWithByteCollectionsArgs,
  context: IncomingMessage,
): Promise<CategoryWithByteCollection> {
  return await getByteCollectionCategoryWithByteCollections(args.spaceId, args.categoryId);
}
