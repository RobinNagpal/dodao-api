import { ByteCollection as ByteCollectionGraphql, QueryByteCollectionsArgs } from '@/graphql/generated/graphql';
import { logError } from '@/helpers/adapters/errorLogger';
import { getByteCollectionRedisKey, getByteCollectionWithBytes } from '@/helpers/byteCollection/byteCollectionsHelper';
import { getRedisValue, setRedisValue } from '@/helpers/redis';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function byteCollections(_: any, args: QueryByteCollectionsArgs, context: IncomingMessage): Promise<ByteCollectionGraphql[]> {
  const redisKey = getByteCollectionRedisKey(args.spaceId);

  const byteCollection = await getRedisValue(redisKey);
  if (byteCollection) {
    return JSON.parse(byteCollection);
  }

  console.log('byte collection not found in redis');
  const byteCollections = await prisma.byteCollection.findMany({
    where: {
      spaceId: args.spaceId,
      status: {
        not: 'DELETED',
      },
    },
    orderBy: {
      order: 'desc',
    },
  });

  const byteCollectionsWithBytes: ByteCollectionGraphql[] = [];

  for (const byteCollection of byteCollections) {
    byteCollectionsWithBytes.push(await getByteCollectionWithBytes(byteCollection));
  }

  try {
    await setRedisValue(redisKey, JSON.stringify(byteCollectionsWithBytes));
  } catch (e) {
    logError('Error setting redis value', { error: e });
  }

  return byteCollectionsWithBytes;
}
