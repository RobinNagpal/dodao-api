import { QueryRawGitCoursesArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function rawGitCourses(_: unknown, args: QueryRawGitCoursesArgs) {
  return prisma.gitCourse.findMany({ where: { spaceId: args.spaceId } });
}
