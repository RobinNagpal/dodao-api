import { QueryProjectByteArgs, QueryProjectByteCollectionArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default function projectByteCollection(_: any, { projectId, byteCollectionId }: QueryProjectByteCollectionArgs) {
  return prisma.projectByteCollection.findUniqueOrThrow({
    where: {
      id: byteCollectionId,
    },
  });
}
