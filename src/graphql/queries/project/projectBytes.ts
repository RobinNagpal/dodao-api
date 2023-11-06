import { QueryProjectBytesArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default function projectBytes(_: any, { projectId }: QueryProjectBytesArgs) {
  return prisma.projectByte.findMany({ where: { projectId: projectId } });
}
