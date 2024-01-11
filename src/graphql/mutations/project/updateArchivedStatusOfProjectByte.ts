import { MutationUpdateArchivedStatusOfProjectByteArgs } from '@/graphql/generated/graphql';
import { TOP_CRYPTO_PROJECTS_SPACE_ID } from '@/helpers/chat/utils/app/constants';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateArchivedStatusOfProjectByte(parent: any, args: MutationUpdateArchivedStatusOfProjectByteArgs, context: IncomingMessage) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: TOP_CRYPTO_PROJECTS_SPACE_ID } });

  const decodedJwt = checkEditSpacePermission(spaceById, context);

  const upsertedProjectByte = await prisma.projectByte.update({
    data: {
      archived: args.archived,
    },
    where: {
      id: args.projectByteId,
    },
  });

  return upsertedProjectByte;
}
