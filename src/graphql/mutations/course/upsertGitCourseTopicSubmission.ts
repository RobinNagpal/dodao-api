import { MutationUpsertGitCourseTopicSubmissionArgs } from '@/graphql/generated/graphql';
import { getDecodedJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { getSpaceById } from '@/graphql/operations/space';
import { prisma } from '@/prisma';
import { CourseQuestionSubmission, ExplanationSubmission, ReadingSubmission, SummarySubmission, TopicItemStatus } from '@/types/course/submission';
import { IncomingMessage } from 'http';

export default async function upsertGitCourseTopicSubmission(_: unknown, args: MutationUpsertGitCourseTopicSubmissionArgs, context: IncomingMessage) {
  try {
    const {
      spaceId,
      gitCourseTopicSubmission: { courseKey, topicKey },
    } = args;

    const decodedJWT = getDecodedJwtFromContext(context);

    const existingCourseSubmission = await prisma.gitCourseSubmission.findFirstOrThrow({
      where: {
        spaceId: spaceId,
        createdBy: decodedJWT.accountId,
        courseKey,
      },
    });

    await prisma.gitCourseSubmission.update({
      where: {
        uuid: existingCourseSubmission.uuid,
      },
      data: {},
    });

    const existingTopicSubmission = await prisma.gitCourseTopicSubmission.findFirst({
      where: {
        courseKey,
        topicKey: args.gitCourseTopicSubmission.topicKey,
      },
    });

    if (existingTopicSubmission) {
      return await prisma.gitCourseTopicSubmission.update({
        where: {
          uuid: existingTopicSubmission.uuid,
        },
        data: {
          ...args.gitCourseTopicSubmission,
        },
      });
    } else {
      return await prisma.gitCourseTopicSubmission.create({
        data: {
          ...args.gitCourseTopicSubmission,
          spaceId: spaceId,
          createdBy: decodedJWT.accountId,
          isLatestSubmission: true,
          courseSubmissionUuid: existingCourseSubmission.uuid,
          submission: {
            uuid: args.gitCourseTopicSubmission.uuid,
            explanations: args.gitCourseTopicSubmission.explanations as ExplanationSubmission[],
            questions: args.gitCourseTopicSubmission.questions as CourseQuestionSubmission[],
            readings: args.gitCourseTopicSubmission.readings.map(
              (reading): ReadingSubmission => ({
                uuid: reading.uuid,
                status: reading.status as TopicItemStatus,
              }),
            ),
            summaries: args.gitCourseTopicSubmission.summaries as SummarySubmission[],
          },
        },
      });
    }
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
