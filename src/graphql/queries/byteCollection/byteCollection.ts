import { ByteCollection as ByteCollectionGraphql, QueryByteCollectionArgs, QueryByteCollectionsArgs } from '@/graphql/generated/graphql';
import { getByteCollectionRedisKey, getByteCollectionWithBytes } from '@/helpers/byteCollection/byteCollectionsHelper';
import { getRedisValue } from '@/helpers/redis';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function byteCollection(_: any, args: QueryByteCollectionArgs, context: IncomingMessage): Promise<ByteCollectionGraphql> {
  const byteCollection = await prisma.byteCollection.findFirstOrThrow({
    where: {
      spaceId: args.spaceId,
      id: args.byteCollectionId,
    },
    orderBy: {
      priority: 'desc',
    },
  });

  return await getByteCollectionWithBytes(byteCollection);
}
