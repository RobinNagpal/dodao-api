import { QueryRawGitCourseArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function rawGitCourse(_: unknown, args: QueryRawGitCourseArgs) {
  return prisma.gitCourse.findFirst({ where: { spaceId: args.spaceId, courseKey: args.key } });
}
