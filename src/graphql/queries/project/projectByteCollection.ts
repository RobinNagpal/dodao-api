import { QueryProjectByteArgs, QueryProjectByteCollectionArgs } from '@/graphql/generated/graphql';
import { getProjectByteCollectionWithBytes } from '@/helpers/project/projectByteCollectionsHelper';
import { prisma } from '@/prisma';

export default async function projectByteCollection(_: any, { projectId, byteCollectionId }: QueryProjectByteCollectionArgs) {
  const byteCollection = await prisma.projectByteCollection.findUniqueOrThrow({
    where: {
      id: byteCollectionId,
    },
  });
  return await getProjectByteCollectionWithBytes(byteCollection);
}
