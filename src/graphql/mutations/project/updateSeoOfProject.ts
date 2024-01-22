import { MutationUpdateSeoOfProjectArgs } from '@/graphql/generated/graphql';
import { TOP_CRYPTO_PROJECTS_SPACE_ID } from '@/helpers/chat/utils/app/constants';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateSeoOfProject(parent: any, args: MutationUpdateSeoOfProjectArgs, context: IncomingMessage) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: TOP_CRYPTO_PROJECTS_SPACE_ID } });

  const decodedJwt = checkEditSpacePermission(spaceById, context);

  const upsertedProject = await prisma.project.update({
    data: {
      seoMeta: args.seoMeta ?? {},
    },
    where: {
      id: args.projectId,
    },
  });

  return upsertedProject;
}
