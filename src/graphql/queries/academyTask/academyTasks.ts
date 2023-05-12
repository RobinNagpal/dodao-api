import { QueryAcademyTasksArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function academyTasks(_: any, args: QueryAcademyTasksArgs) {
  return prisma.academyTask.findMany({ where: { spaceId: args.spaceId } });
}
