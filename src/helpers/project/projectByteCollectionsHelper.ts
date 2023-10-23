import { ByteCollectionByte, ProjectByteCollection as ProjectByteCollectionGraphql } from '@/graphql/generated/graphql';
import { logError } from '@/helpers/adapters/errorLogger';
import { getByteCollectionRedisKey } from '@/helpers/byteCollection/byteCollectionsHelper';
import { getRedisValue, setRedisValue } from '@/helpers/redis';
import { prisma } from '@/prisma';
import { ProjectByteCollection } from '@prisma/client';

export async function getProjectByteCollectionWithBytes(byteCollection: ProjectByteCollection): Promise<ProjectByteCollectionGraphql> {
  const bytes: ByteCollectionByte[] = [];
  for (const byteId of byteCollection.byteIds) {
    const byte = await prisma.projectByte.findFirstOrThrow({
      where: {
        id: byteId,
      },
    });
    bytes.push({
      byteId: byte.id,
      name: byte.name,
      content: byte.content,
    });
  }
  return {
    ...byteCollection,
    bytes: bytes,
  };
}

export function getProjectByteCollectionRedisKey(spaceId: string) {
  return `project_byte_collections_${spaceId}`;
}

export async function getProjectBytesCollectionWithBytes(projectId: string) {
  const projectByteCollections = await prisma.projectByteCollection.findMany({ where: { projectId: projectId } });

  const redisKey = getByteCollectionRedisKey(projectId);

  const byteCollection = await getRedisValue(redisKey);

  if (byteCollection) {
    return JSON.parse(byteCollection) as ProjectByteCollectionGraphql[];
  }
  const byteCollectionsWithBytes: ProjectByteCollectionGraphql[] = [];

  for (const byteCollection of projectByteCollections) {
    byteCollectionsWithBytes.push(await getProjectByteCollectionWithBytes(byteCollection));
  }

  try {
    await setRedisValue(redisKey, JSON.stringify(byteCollectionsWithBytes));
  } catch (e) {
    logError('Error setting redis value', { error: e });
  }
  return byteCollectionsWithBytes;
}
