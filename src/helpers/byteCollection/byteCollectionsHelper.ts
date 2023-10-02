import { ByteModel } from '@/deprecatedSchemas/models/byte/ByteModel';
import { ByteCollection as ByteCollectionGraphql, ByteCollectionByte } from '@/graphql/generated/graphql';
import { getByte } from '@/graphql/queries/byte/byte';
import { ByteCollection } from '@prisma/client';

export async function getByteCollectionWithBytes(byteCollection: ByteCollection): Promise<ByteCollectionGraphql> {
  const bytes: ByteCollectionByte[] = [];
  for (const byteId of byteCollection.byteIds) {
    const byte = (await getByte(byteCollection.spaceId, byteId)) as ByteModel;
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

export function getByteCollectionRedisKey(spaceId: string) {
  return `byte_collections_${spaceId}`;
}
