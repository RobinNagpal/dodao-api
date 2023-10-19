import { QueryProjectByteCollectionsArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default function projectByteCollections(_: any, { projectId }: QueryProjectByteCollectionsArgs) {
  return prisma.projectByteCollection.findMany({
    where: {
      projectId,
    },
  });
}
