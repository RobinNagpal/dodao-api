import { QueryProjectArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default function project(_: any, { id }: QueryProjectArgs) {
  return prisma.project.findUniqueOrThrow({
    where: {
      id,
    },
  });
}
