import { prisma } from '@/prisma';

export default function projectBytes() {
  return prisma.projectByte.findMany();
}
