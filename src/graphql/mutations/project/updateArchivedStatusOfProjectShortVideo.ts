import { MutationUpdateArchivedStatusOfProjectShortVideoArgs } from '@/graphql/generated/graphql';
import { PredefinedSpaces } from '@/helpers/chat/utils/app/constants';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateArchivedStatusOfProjectShortVideo(
  parent: any,
  args: MutationUpdateArchivedStatusOfProjectShortVideoArgs,
  context: IncomingMessage,
) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: PredefinedSpaces.TIDBITS_HUB } });

  const decodedJwt = checkEditSpacePermission(spaceById, context);

  const upsertedProjectByteCollection = await prisma.projectShortVideo.update({
    data: {
      archived: args.archived,
    },
    where: {
      id: args.projectShortVideoId,
    },
  });

  return upsertedProjectByteCollection;
}
