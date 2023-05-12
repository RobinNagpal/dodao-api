import { QueryGitCourseArgs } from '@/graphql/generated/graphql';
import { getGitCourseFromRedis } from '@/helpers/course/gitCourseReader';

export default async function gitCourse(_: any, args: QueryGitCourseArgs) {
  const { spaceId, courseKey } = args;

  return await getGitCourseFromRedis(spaceId, courseKey);
}
