import { MutationUpdateSeoOfProjectShortVideoArgs } from '@/graphql/generated/graphql';
import { PredefinedSpaces } from '@/helpers/chat/utils/app/constants';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateSeoOfProjectShortVideo(parent: any, args: MutationUpdateSeoOfProjectShortVideoArgs, context: IncomingMessage) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: PredefinedSpaces.TIDBITS_HUB } });

  const decodedJwt = checkEditSpacePermission(spaceById, context);

  const upsertedProjectShortVideo = await prisma.projectShortVideo.update({
    data: {
      seoMeta: args.seoMeta ?? {},
    },
    where: {
      id: args.projectId,
    },
  });

  return upsertedProjectShortVideo;
}
