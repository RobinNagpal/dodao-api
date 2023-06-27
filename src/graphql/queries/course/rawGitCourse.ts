import { QueryRawGitCourseArgs, RawGitCourse } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';
import { GitCourse } from '@prisma/client';

export default async function rawGitCourse(_: unknown, args: QueryRawGitCourseArgs): Promise<RawGitCourse> {
  const gitCourse: GitCourse = await prisma.gitCourse.findFirstOrThrow({
    where: {
      spaceId: args.spaceId,
      courseKey: args.key,
    },
  });
  return gitCourse;
}
