import { MutationDeleteShortVideoArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';

export default async function deleteShortVideo(parent: any, { shortVideoId, spaceId }: MutationDeleteShortVideoArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(spaceId);

  checkEditSpacePermission(spaceById, context);

  try {
    const archivedShortVideo = await prisma.shortVideo.update({
      where: { id: shortVideoId },
      data: { archive: true },
    });

    return archivedShortVideo;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
