import { MutationReloadAcademyRepositoryArgs } from '@/graphql/generated/graphql';
import { pullAcademyAndSetInRedis } from '@/helpers/academy/gitAcademyReader';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function createSpace(_: unknown, args: MutationReloadAcademyRepositoryArgs, context: IncomingMessage) {
  const doDAOSuperAdmin = isDoDAOSuperAdmin(context);
  if (!doDAOSuperAdmin) {
    throw new Error('Space not found');
  }
  const spaceId = args.spaceId;

  const space = await prisma.space.findUniqueOrThrow({ where: { id: spaceId } });

  await pullAcademyAndSetInRedis(space);

  return true;
}
