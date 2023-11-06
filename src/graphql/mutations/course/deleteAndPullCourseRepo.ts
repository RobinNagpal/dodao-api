import { MutationDeleteAndPullCourseRepoArgs } from '@/graphql/generated/graphql';
import { getCourseRepoInfo } from '@/helpers/course/getCourseHelper';
import { pullGitCourseAndSetInRedis, readGitCourse } from '@/helpers/course/gitCourseReader';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { prisma } from '@/prisma';
import fs from 'fs';
import { IncomingMessage } from 'http';

export default async function deleteAndPullCourseRepo(_: unknown, args: MutationDeleteAndPullCourseRepoArgs, context: IncomingMessage) {
  const { space, decodedJwt } = await verifySpaceEditPermissions(context, args.spaceId);
  const rawCourse = await prisma.gitCourse.findFirstOrThrow({
    where: {
      spaceId: space.id,
      courseKey: args.courseKey,
    },
  });

  const courseRepoInfo = getCourseRepoInfo(space.id, rawCourse.courseRepoUrl);

  fs.rmSync(courseRepoInfo.repositoryPath, { recursive: true, force: true });

  await pullGitCourseAndSetInRedis(space, rawCourse);

  return await readGitCourse(space, rawCourse);
}
