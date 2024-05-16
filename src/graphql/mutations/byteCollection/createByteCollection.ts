import { MutationCreateByteCollectionArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { getByteCollectionRedisKey, getByteCollectionWithBytes } from '@/helpers/byteCollection/byteCollectionsHelper';
import { deleteRedisValue } from '@/helpers/redis';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export default async function createByteCollection(_: any, args: MutationCreateByteCollectionArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.input.spaceId);

  checkEditSpacePermission(spaceById, context);

  const byteCollection = await prisma.byteCollection.create({
    data: {
      id: v4(),
      name: args.input.name,
      description: args.input.description,
      spaceId: args.input.spaceId,
      byteIds: args.input.byteIds,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: args.input.status,
      priority: args.input.priority,
      videoUrl: args.input.videoUrl,
      videoAspectRatio: args.input.videoAspectRatio,
    },
  });

  await deleteRedisValue(getByteCollectionRedisKey(byteCollection.spaceId));

  return await getByteCollectionWithBytes(byteCollection);
}
