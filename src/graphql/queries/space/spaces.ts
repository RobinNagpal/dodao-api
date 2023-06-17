import { Space } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default function spaces(): Promise<Space[]> {
  return prisma.space.findMany();
}
