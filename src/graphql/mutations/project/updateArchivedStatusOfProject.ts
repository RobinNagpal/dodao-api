import { MutationUpdateArchivedStatusOfProjectArgs } from '@/graphql/generated/graphql';
import { PredefinedSpaces } from '@/helpers/chat/utils/app/constants';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateArchivedStatusOfProject(parent: any, args: MutationUpdateArchivedStatusOfProjectArgs, context: IncomingMessage) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: PredefinedSpaces.TIDBITS_HUB } });

  const decodedJwt = checkEditSpacePermission(spaceById, context);

  const upsertedProject = await prisma.project.update({
    data: {
      archived: args.archived,
    },
    where: {
      id: args.projectId,
    },
  });

  return upsertedProject;
}
