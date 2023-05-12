import { QueryGitCourseSummarizedArgs } from '@/graphql/generated/graphql';
import { getGitCourseFromRedis } from '@/helpers/course/gitCourseReader';

export default async function gitCourseSummarized(_: any, args: QueryGitCourseSummarizedArgs) {
  const { spaceId, key } = args;

  return await getGitCourseFromRedis(spaceId, key);
}
