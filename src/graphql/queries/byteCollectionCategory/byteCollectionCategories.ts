import { QueryByteCollectionCategoriesArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export async function getByteCollectionCategories(spaceId: string) {
  const byteCollectionCategories = await prisma.byteCollectionCategory.findMany({
    where: {
      spaceId: spaceId,
    },
    orderBy: {
      priority: 'desc',
    },
  });

  return byteCollectionCategories;
}
export default async function byteCollectionCategories(_: any, args: QueryByteCollectionCategoriesArgs) {
  return getByteCollectionCategories(args.spaceId);
}
