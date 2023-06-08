import { QueryCoursesArgs } from '@/graphql/generated/graphql';

import { getAllGitGitCoursesForSpace } from '@/helpers/course/gitCourseReader';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';

export default async function summarizedGitCourses(_: any, args: QueryCoursesArgs) {
  const { spaceId } = args;
  const space: Space = await prisma.space.findFirstOrThrow({ where: { id: spaceId } });
  return await getAllGitGitCoursesForSpace(space);
}
