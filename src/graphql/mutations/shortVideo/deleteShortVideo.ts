import { MutationDeleteShortVideoArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteShortVideo(parent: any, { shortVideoId }: MutationDeleteShortVideoArgs, context: IncomingMessage) {
  try {
    const shortVideo = await prisma.shortVideo.findUniqueOrThrow({ where: { id: shortVideoId } });
    await prisma.shortVideo.delete({ where: { id: shortVideoId } });
    return shortVideo;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
