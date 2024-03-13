import { QueryByteCollectionCategoryWithByteCollectionsArgs, CategoryWithByteCollection } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { getByte } from '../byte/byte';

export default async function byteCollectionCategoryWithByteCollections(
  _: any,
  args: QueryByteCollectionCategoryWithByteCollectionsArgs,
  context: IncomingMessage,
): Promise<CategoryWithByteCollection> {
  const byteCollectionCategory = await prisma.byteCollectionCategory.findUnique({
    where: {
      id: args.categoryId,
    },
  });

  const byteCollectionArr = [];

  if (byteCollectionCategory) {
    for (const byteCollectionId of byteCollectionCategory.byteCollectionIds) {
      const bytes = [];
      const byteCollection = await prisma.byteCollection.findFirstOrThrow({
        where: {
          spaceId: args.spaceId,
          id: byteCollectionId,
        },
        orderBy: {
          priority: 'desc',
        },
      });
      for (const byteId of byteCollection.byteIds) {
        const byte = await getByte(byteCollection.spaceId, byteId);
        bytes.push({
          byteId: byte.id,
          name: byte.name,
          content: byte.content,
          videoUrl: byte.videoUrl,
        });
      }
      byteCollectionArr.push({
        id: byteCollection.id,
        name: byteCollection.name,
        description: byteCollection.description,
        bytes: bytes,
        status: byteCollection.status,
        priority: byteCollection.priority,
        byteIds: byteCollection.byteIds,
      });
    }

    const ByteCollectionWithCategory = {
      id: byteCollectionCategory.id,
      name: byteCollectionCategory.name,
      excerpt: byteCollectionCategory.excerpt,
      imageUrl: byteCollectionCategory.imageUrl,
      creator: byteCollectionCategory.creator,
      byteCollectionArr: byteCollectionArr,
    };
    return ByteCollectionWithCategory;
  }

  return {
    id: '',
    name: 'Name',
    excerpt: 'Excerpt',
    imageUrl: '',
    creator: '',
    byteCollectionArr: [],
  } as CategoryWithByteCollection;
}
