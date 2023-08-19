import { MutationUpsertGitCourseTopicSubmissionArgs } from '@/graphql/generated/graphql';
import { getDecodedJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { prisma } from '@/prisma';
import {
  CourseQuestionSubmission,
  ExplanationSubmission,
  ReadingSubmission,
  SummarySubmission,
  TempTopicSubmissionModel,
  TopicItemStatus,
  TopicStatus,
} from '@/types/course/submission';
import { IncomingMessage } from 'http';

export default async function upsertGitCourseTopicSubmission(_: unknown, args: MutationUpsertGitCourseTopicSubmissionArgs, context: IncomingMessage) {
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

  const topicSubmission: TempTopicSubmissionModel = {
    uuid: args.gitCourseTopicSubmission.uuid,
    courseKey: args.gitCourseTopicSubmission.courseKey,
    topicKey: args.gitCourseTopicSubmission.topicKey,
    explanations: args.gitCourseTopicSubmission.explanations as ExplanationSubmission[],
    questions: args.gitCourseTopicSubmission.questions as CourseQuestionSubmission[],
    readings: args.gitCourseTopicSubmission.readings.map(
      (reading): ReadingSubmission => ({
        uuid: reading.uuid,
        status: reading.status as TopicItemStatus,
      }),
    ),
    summaries: args.gitCourseTopicSubmission.summaries as SummarySubmission[],
    status: args.gitCourseTopicSubmission.status as TopicStatus,
  };

  if (existingTopicSubmission) {
    await prisma.gitCourseTopicSubmission.update({
      where: {
        uuid: existingTopicSubmission.uuid,
      },
      data: {
        isLatestSubmission: existingCourseSubmission.isLatestSubmission,
        topicKey: args.gitCourseTopicSubmission.topicKey,
        status: args.gitCourseTopicSubmission.status,
        spaceId: spaceId,
        createdBy: decodedJWT.accountId,
        courseSubmissionUuid: existingCourseSubmission.uuid,
        submission: topicSubmission,
      },
    });
  } else {
    await prisma.gitCourseTopicSubmission.create({
      data: {
        uuid: args.gitCourseTopicSubmission.uuid,
        courseKey: args.gitCourseTopicSubmission.courseKey,
        createdAt: new Date(),
        isLatestSubmission: existingCourseSubmission.isLatestSubmission,
        topicKey: args.gitCourseTopicSubmission.topicKey,
        status: args.gitCourseTopicSubmission.status,
        spaceId: spaceId,
        createdBy: decodedJWT.accountId,
        courseSubmissionUuid: existingCourseSubmission.uuid,
        submission: topicSubmission,
      },
    });
  }

  const courseSubmission = await prisma.gitCourseSubmission.findFirstOrThrow({ where: { spaceId, courseKey, createdBy: decodedJWT.accountId } });
  const topicSubmissions = await prisma.gitCourseTopicSubmission.findMany({ where: { spaceId, courseKey, createdBy: decodedJWT.accountId } });

  return {
    ...courseSubmission,
    topicSubmissions: topicSubmissions,
  };
}
