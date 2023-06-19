import { prisma } from '@/prisma';

export async function getSpaceWithIntegrations(spaceId: string) {
  const space = await prisma.space.findUniqueOrThrow({ where: { id: spaceId } });

  const spaceIntegrations = await prisma.spaceIntegration.findUnique({ where: { spaceId } });
  return { ...space, spaceIntegrations };
}
