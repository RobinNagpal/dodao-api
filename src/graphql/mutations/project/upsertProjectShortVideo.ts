import { MutationUpsertProjectShortVideoArgs } from '@/graphql/generated/graphql';
import { TOP_CRYPTO_PROJECTS_SPACE_ID } from '@/helpers/chat/utils/app/constants';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { ProjectShortVideo } from '@prisma/client';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export default async function upsertProjectShortVideo(_: unknown, args: MutationUpsertProjectShortVideoArgs, context: IncomingMessage) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: TOP_CRYPTO_PROJECTS_SPACE_ID } });

  checkEditSpacePermission(spaceById, context);

  const shortVideo = args.shortVideo;

  const savedObject: ProjectShortVideo = await prisma.projectShortVideo.upsert({
    create: {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      title: shortVideo.title,
      description: shortVideo.description,
      priority: shortVideo.priority,
      projectId: args.projectId,
      videoUrl: shortVideo.videoUrl,
      thumbnail: shortVideo.thumbnail,
      archive: shortVideo.archive,
    },
    update: {
      title: shortVideo.title,
      description: shortVideo.description,
      priority: shortVideo.priority,
      updatedAt: new Date(),
      videoUrl: shortVideo.videoUrl,
      thumbnail: shortVideo.thumbnail,
      archive: shortVideo.archive,
    },
    where: {
      id: shortVideo.id,
    },
  });

  return savedObject;
}
