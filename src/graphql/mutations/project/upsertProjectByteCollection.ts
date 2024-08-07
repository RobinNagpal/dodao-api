import { MutationUpsertProjectByteCollectionArgs } from '@/graphql/generated/graphql';
import { PredefinedSpaces } from '@/helpers/chat/utils/app/constants';
import { getProjectByteCollectionRedisKey, getProjectByteCollectionWithBytes } from '@/helpers/project/projectByteCollectionsHelper';
import { deleteRedisValue } from '@/helpers/redis';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertProjectByteCollection(_: any, args: MutationUpsertProjectByteCollectionArgs, context: IncomingMessage) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: PredefinedSpaces.TIDBITS_HUB } });

  checkEditSpacePermission(spaceById, context);
  const updatedByteCollection = await prisma.projectByteCollection.upsert({
    where: {
      id: args.input.id,
    },
    update: {
      name: args.input.name,
      description: args.input.description,
      byteIds: args.input.byteIds,
      status: args.input.status,
      updatedAt: new Date(),
      priority: args.input.priority,
      videoUrl: args.input.videoUrl,
      seoMeta: {
        title: args.input.seoMeta?.title ?? args.input.name,
        description: args.input.seoMeta?.description ?? args.input.description,
        keywords: args.input.seoMeta?.keywords ?? [],
      },
    },
    create: {
      id: args.input.id,
      name: args.input.name,
      description: args.input.description,
      projectId: args.input.projectId,
      byteIds: args.input.byteIds,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: args.input.status,
      priority: args.input.priority,
      videoUrl: args.input.videoUrl,
      archived: false,
      seoMeta: {
        title: args.input.seoMeta?.title ?? args.input.name,
        description: args.input.seoMeta?.description ?? args.input.description,
        keywords: args.input.seoMeta?.keywords ?? [],
      },
    },
  });

  await deleteRedisValue(getProjectByteCollectionRedisKey(updatedByteCollection.projectId));

  return await getProjectByteCollectionWithBytes(updatedByteCollection);
}
