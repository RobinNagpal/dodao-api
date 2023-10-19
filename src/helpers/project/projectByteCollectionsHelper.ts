import { ByteCollectionByte, ProjectByteCollection as ProjectByteCollectionGraphql } from '@/graphql/generated/graphql';
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
