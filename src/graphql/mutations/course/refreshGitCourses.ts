import { MutationRefreshGitCoursesArgs } from '@/graphql/generated/graphql';
import { verifySpaceEditPermissions } from '@/graphql/mutations/helper/verifySpaceEditPermissions';
import { pullAllCoursesForSpace } from '@/helpers/course/gitCourseReader';
import { IncomingMessage } from 'http';

export default async function refreshGitCourses(_: unknown, args: MutationRefreshGitCoursesArgs, context: IncomingMessage) {
  try {
    const { space } = await verifySpaceEditPermissions(context, args.spaceId);

    await pullAllCoursesForSpace(space);

    return true;
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
