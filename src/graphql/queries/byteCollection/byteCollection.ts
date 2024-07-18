import { ByteCollection as ByteCollectionGraphql, QueryByteCollectionArgs, QueryByteCollectionsArgs } from '@/graphql/generated/graphql';
import { getByteCollectionRedisKey, getByteCollectionWithBytes } from '@/helpers/byteCollection/byteCollectionsHelper';
import { getRedisValue } from '@/helpers/redis';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

// export default async function byteCollection(_: any, args: QueryByteCollectionArgs, context: IncomingMessage): Promise<ByteCollectionGraphql> {
// export default async function byteCollection(args: QueryByteCollectionArgs) {
export default async function byteCollection(_: any, args: QueryByteCollectionArgs, context: IncomingMessage) {
  const byteCollection = await prisma.byteCollection.findFirstOrThrow({
    where: {
      spaceId: args.spaceId,
      id: args.byteCollectionId,
    },
    // include: { Byte: true },
    orderBy: {
      priority: 'desc',
    },
  });

  return byteCollection;
}

// (async () => {
//   const args: QueryByteCollectionArgs = {
//     byteCollectionId: 'UNGROUPED_TIDBITS',
//     spaceId: 'test-academy-eth',
//   };

//   try {
//     const result = await byteCollection(args);
//     console.log('Result:', result);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();
