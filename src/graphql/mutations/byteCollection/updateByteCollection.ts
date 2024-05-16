import { MutationUpdateByteCollectionArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { getByteCollectionRedisKey, getByteCollectionWithBytes } from '@/helpers/byteCollection/byteCollectionsHelper';
import { deleteRedisValue } from '@/helpers/redis';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateByteCollection(_: any, args: MutationUpdateByteCollectionArgs, context: IncomingMessage) {
  const byteCollection = await prisma.byteCollection.findUniqueOrThrow({
    where: {
      id: args.input.byteCollectionId,
    },
  });

  const spaceById = await getSpaceById(byteCollection.spaceId);

  checkEditSpacePermission(spaceById, context);

  const updatedByteCollection = await prisma.byteCollection.update({
    where: {
      id: args.input.byteCollectionId,
    },
    data: {
      name: args.input.name,
      description: args.input.description,
      byteIds: args.input.byteIds,
      status: args.input.status,
      updatedAt: new Date(),
      priority: args.input.priority,
      videoUrl: args.input.videoUrl,
      aspectRatio: args.input.aspectRatio,
    },
  });

  await deleteRedisValue(getByteCollectionRedisKey(byteCollection.spaceId));

  return await getByteCollectionWithBytes(updatedByteCollection);
}
