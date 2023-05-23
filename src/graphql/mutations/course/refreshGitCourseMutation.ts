import { MutationRefreshGitCourseArgs } from '@/graphql/generated/graphql';
import { verifySpaceEditPermissions } from '@/graphql/mutations/helper/verifySpaceEditPermissions';
import { pullGitCourseAndSetInRedis } from '@/helpers/course/gitCourseReader';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function refreshGitCourseMutation(_: unknown, args: MutationRefreshGitCourseArgs, context: IncomingMessage) {
  try {
    const { space } = await verifySpaceEditPermissions(context, args.spaceId);

    const rawGitCourseModel = await prisma.gitCourse.findFirstOrThrow({
      where: {
        spaceId: space.id,
        courseKey: args.courseKey,
      },
    });

    await pullGitCourseAndSetInRedis(space, rawGitCourseModel);

    return true;
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
