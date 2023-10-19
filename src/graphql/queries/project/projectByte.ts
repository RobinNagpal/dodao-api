import { QueryProjectByteArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default function projectByte(_: any, { projectByteId }: QueryProjectByteArgs) {
  return prisma.projectByte.findUniqueOrThrow({
    where: {
      id: projectByteId,
    },
  });
}
