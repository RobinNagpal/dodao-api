import { MutationUpsertShortVideoArgs } from '@/graphql/generated/graphql';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export default async function upsertShortVideo(parent: any, { spaceId, shortVideo }: MutationUpsertShortVideoArgs, context: IncomingMessage) {
  try {
    const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: spaceId } });
    if (!spaceById) throw new Error(`No space found: ${spaceId}`);

    const decodedJwt = checkEditSpacePermission(spaceById, context);

    const upsertedShortVideo = await prisma.shortVideo.upsert({
      create: {
        id: v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        title: shortVideo.title,
        description: shortVideo.description,
        priority: shortVideo.priority,
        spaceId: spaceId,
        videoUrl: shortVideo.videoUrl,
        thumbnail: shortVideo.thumbnail,
      },
      update: {
        title: shortVideo.title,
        description: shortVideo.description,
        priority: shortVideo.priority,
        updatedAt: new Date(),
        videoUrl: shortVideo.videoUrl,
        thumbnail: shortVideo.thumbnail,
      },
      where: {
        id: shortVideo.id,
      },
    });
    return upsertedShortVideo;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
