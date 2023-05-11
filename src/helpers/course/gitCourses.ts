import { SummarizedGitCourse } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';
import { getAllGitGitCoursesForSpace } from '@/helpers/course/gitCourseReader';

export async function getGitCourses(spaceId: string, keys: string[]): Promise<SummarizedGitCourse[]> {
  const space: Space = (await prisma.space.findUnique({ where: { id: spaceId } })) as Space;

  const coursesForSpace = await getAllGitGitCoursesForSpace(space);

  return coursesForSpace.filter((c) => keys.includes(c.key)) || [];
}
