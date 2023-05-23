import { MutationUpsertGitCourseArgs } from '@/graphql/generated/graphql';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { pullGitCourseAndSetInRedis, readGitCourse } from '@/helpers/course/gitCourseReader';
import { transformToSummarizedCourse } from '@/helpers/course/transformToSummarizedCourse';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { uuid } from 'uuidv4';

export default async function upsertGitCourseMutation(_: unknown, args: MutationUpsertGitCourseArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifySpaceEditPermissions(context, args.spaceId);
    const course = await readGitCourse(space, args.gitCourseInput);

    const rawCourse = await prisma.gitCourse.upsert({
      where: {
        spaceId_courseKey: {
          spaceId: space.id,
          courseKey: course.key,
        },
      },
      create: {
        id: uuid(),
        spaceId: space.id,
        courseKey: course.key,
        createdBy: decodedJwt.accountId,
        courseAdmins: [],
        ...args.gitCourseInput,
      },
      update: {
        ...args.gitCourseInput,
      },
    });
    await pullGitCourseAndSetInRedis(space, rawCourse);

    return transformToSummarizedCourse(course);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
