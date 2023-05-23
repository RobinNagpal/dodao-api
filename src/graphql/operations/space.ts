import { prisma } from '@/prisma';

export function getSpaceById(spaceId: string) {
  return prisma.space.findUniqueOrThrow({ where: { id: spaceId } });
}
