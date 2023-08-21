import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { CourseQuestionSubmission } from '@/deprecatedSchemas/models/course/GitCourseTopicSubmission';
import { TopicQuestionModel } from '@/deprecatedSchemas/models/course/TopicQuestionModel';
import { prisma } from '@/prisma';
import { MutationSubmitGitCourseTopicArgs } from '@/graphql/generated/graphql';
import { verifyJwtForRequest } from '@/helpers/permissions/verifyJwtForRequest';
import { getGitCourseFromRedis } from '@/helpers/course/gitCourseReader';
import { postTopicSubmission } from '@/helpers/discord/webhookMessage';
import { CourseStatus, TempTopicSubmissionModel, TopicStatus } from '@/types/course/submission';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';
import intersection from 'lodash/intersection';
import isEqual from 'lodash/isEqual';
import partition from 'lodash/partition';
import { v4 } from 'uuid';

export default async function submitGitCourseTopicMutation(_: unknown, args: MutationSubmitGitCourseTopicArgs, context: IncomingMessage) {
  async function createNewEmptyTopicSubmission(spaceId: string, courseKey: string, decodedJwt: JwtPayload & DoDaoJwtTokenPayload, topicKey: string) {
    const existingCourseSubmission = await prisma.gitCourseSubmission.findFirstOrThrow({
      where: {
        spaceId: spaceId,
        courseKey: courseKey,
        createdBy: decodedJwt.userId,
        status: {
          not: CourseStatus.Submitted,
        },
      },
    });

    const submission: TempTopicSubmissionModel = {
      uuid: v4(),
      questions: [],
      explanations: [],
      readings: [],
      summaries: [],
      topicKey: topicKey,
      courseKey: courseKey,
      status: TopicStatus.Submitted,
    };

    return prisma.gitCourseTopicSubmission.create({
      data: {
        uuid: v4(),
        courseKey: courseKey,
        courseSubmissionUuid: existingCourseSubmission.uuid,
        createdAt: new Date(),
        createdBy: decodedJwt.userId,
        isLatestSubmission: true,
        questionsAttempted: 0,
        questionsCorrect: 0,
        questionsIncorrect: 0,
        questionsSkipped: 0,
        submission: submission,
        spaceId: spaceId,
        topicKey: topicKey,
        updatedAt: new Date(),
        status: TopicStatus.Submitted,
        correctAnswers: [],
      },
    });
  }

  try {
    const spaceId = args.spaceId;
    const courseKey = args.gitCourseTopicSubmission.courseKey;
    const topicKey = args.gitCourseTopicSubmission.topicKey;
    const submissionUuid = args.gitCourseTopicSubmission.uuid;

    const { space, decodedJwt } = await verifyJwtForRequest(context, args.spaceId);

    const courseJson: GitCourseModel | undefined = await getGitCourseFromRedis(space.id, courseKey);

    if (!courseJson) {
      throw new Error(`No course found: ${spaceId} - ${courseKey}`);
    }

    const topicModel = courseJson.topics.find((topic) => topic.key === topicKey);

    const topicSubmission = await prisma.gitCourseTopicSubmission.findFirst({
      where: {
        uuid: submissionUuid,
        isLatestSubmission: true,
      },
    });

    if (!topicSubmission && courseJson.topics.find((t) => t.key === topicKey)?.questions?.length === 0) {
      return await createNewEmptyTopicSubmission(spaceId, courseKey, decodedJwt, topicKey);
    }

    if (!topicSubmission) {
      throw new Error(`No topic submission found: ${spaceId} - ${courseKey} - ${topicKey} - ${decodedJwt.accountId}`);
    }

    const existingCourseSubmission = await prisma.gitCourseSubmission.findFirstOrThrow({
      where: {
        uuid: topicSubmission.courseSubmissionUuid,
      },
    });

    if (!topicModel) {
      throw new Error(`No topic found: ${spaceId} - ${courseKey} - ${topicKey}`);
    }

    const submissionQuestionsMap: { [uuid in string]: CourseQuestionSubmission } = Object.fromEntries(
      topicSubmission.submission.questions.map((q: CourseQuestionSubmission) => [q.uuid, q]),
    );

    const correctAndIncorrectQuestions = partition(topicModel.questions, (q: TopicQuestionModel) => {
      const submissionAnswers = submissionQuestionsMap[q.uuid]?.answers;
      if (!submissionAnswers?.length) {
        throw new Error(`No answer found for question: ${spaceId} - ${courseKey} - ${topicKey} - ${q.uuid}`);
      }

      // We do the intersection to make sure there are no obsolete answer keys. There was a bug which didn't delete the obsolete answer keys
      const selectedAnswers = intersection(q.answerKeys, submissionAnswers);
      return isEqual(q.answerKeys.sort(), selectedAnswers.sort());
    });

    // This is done just to refresh the updated_at
    await prisma.gitCourseSubmission.update({
      where: {
        uuid: existingCourseSubmission.uuid,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    await prisma.gitCourseTopicSubmission.update({
      where: {
        uuid: submissionUuid,
      },
      data: {
        questionsAttempted: topicSubmission.submission.questions.length,
        questionsCorrect: correctAndIncorrectQuestions[0].length,
        questionsIncorrect: correctAndIncorrectQuestions[1].length,
        questionsSkipped: 0,
        correctAnswers: (topicModel.questions || []).map((q) => ({ uuid: q.uuid, answerKeys: q.answerKeys })),
        status: TopicStatus.Submitted,
      },
    });

    const submittiedTopic = await prisma.gitCourseTopicSubmission.findFirst({ where: { uuid: submissionUuid } });

    if (process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK) {
      postTopicSubmission(process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK, space, courseJson, topicModel, submittiedTopic!);
    }

    const courseSubmission = await prisma.gitCourseSubmission.findFirstOrThrow({ where: { spaceId, courseKey, createdBy: decodedJwt.accountId } });
    const topicSubmissions = await prisma.gitCourseTopicSubmission.findMany({ where: { spaceId, courseKey, createdBy: decodedJwt.accountId } });

    return {
      ...courseSubmission,
      topicSubmissions: topicSubmissions,
    };
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
