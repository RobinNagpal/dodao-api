import { QueryAcademyTaskArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function academyTask(_: any, args: QueryAcademyTaskArgs) {
  return prisma.academyTask.findFirstOrThrow({ where: { uuid: args.uuid } });
}
