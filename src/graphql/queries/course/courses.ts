import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { GenericCourse, QueryCoursesArgs } from '@/graphql/generated/graphql';
import { getAllGitGitCoursesForSpace } from '@/helpers/course/gitCourseReader';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';

export default async function getCourses(_: any, args: QueryCoursesArgs): Promise<GenericCourse[]> {
  const { spaceId } = args;

  const space: Space = await prisma.space.findFirstOrThrow({ where: { id: spaceId } });
  const gitCourseModels = await getAllGitGitCoursesForSpace(space);
  return gitCourseModels.map(
    (course: GitCourseModel): GenericCourse => ({
      categories: [],
      content: course.details,
      courseType: 'file',
      duration: course.duration,
      excerpt: course.summary,
      highlights: course.highlights,
      id: course.key,
      name: course.title,
      priority: course.priority,
      publishStatus: course.publishStatus,
      thumbnail: course.thumbnail,
      uuid: course.key,
      courseAdmins: course.courseAdmins || [],
    })
  );
}
