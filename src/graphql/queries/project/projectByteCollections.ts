import { QueryProjectByteCollectionsArgs } from '@/graphql/generated/graphql';
import { getProjectBytesCollectionWithBytes } from '@/helpers/project/projectByteCollectionsHelper';
import { prisma } from '@/prisma';

export default function projectByteCollections(_: any, { projectId }: QueryProjectByteCollectionsArgs) {
  return getProjectBytesCollectionWithBytes(projectId);
}
