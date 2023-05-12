import { QueryRawGitCourseArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function rawGitCourse(parent: any, args: QueryRawGitCourseArgs) {
  return prisma.gitCourse.findFirst({ where: { spaceId: args.spaceId, courseKey: args.key } });
}
