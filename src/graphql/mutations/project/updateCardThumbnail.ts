import { MutationUpdateCardThumbnailArgs } from '@/graphql/generated/graphql';
import { TOP_CRYPTO_PROJECTS_SPACE_ID } from '@/helpers/chat/utils/app/constants';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateCardThumbnail(parent: any, args: MutationUpdateCardThumbnailArgs, context: IncomingMessage) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: TOP_CRYPTO_PROJECTS_SPACE_ID } });

  checkEditSpacePermission(spaceById, context);

  return prisma.project.update({
    data: {
      cardThumbnail: args.cardThumbnail,
    },
    where: {
      id: args.projectId,
    },
  });
}
