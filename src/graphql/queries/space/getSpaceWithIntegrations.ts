import { prisma } from '@/prisma';
import { Space } from '@prisma/client';

export async function getSpaceWithIntegrations(spaceId: string) {
  const space: Space = await prisma.space.findUniqueOrThrow({ where: { id: spaceId } });

  const spaceIntegrations = await prisma.spaceIntegration.findUnique({ where: { spaceId } });
  return { ...space, spaceIntegrations };
}
