import { MutationDeleteByteCollectionArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { getByteCollectionRedisKey } from '@/helpers/byteCollection/byteCollectionsHelper';
import { deleteRedisValue } from '@/helpers/redis';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteByteCollection(_: any, args: MutationDeleteByteCollectionArgs, context: IncomingMessage) {
  const byteCollection = await prisma.byteCollection.findUniqueOrThrow({
    where: {
      id: args.byteCollectionId,
    },
  });

  const spaceById = await getSpaceById(byteCollection.spaceId);

  checkEditSpacePermission(spaceById, context);

  await prisma.byteCollection.update({
    where: {
      id: args.byteCollectionId,
    },
    data: {
      status: 'DELETED',
    },
  });

  await deleteRedisValue(getByteCollectionRedisKey(byteCollection.spaceId));

  return true;
}
