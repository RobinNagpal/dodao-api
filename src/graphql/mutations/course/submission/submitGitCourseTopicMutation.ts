import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { CourseQuestionSubmission } from '@/deprecatedSchemas/models/course/GitCourseTopicSubmission';
import { TopicQuestionModel } from '@/deprecatedSchemas/models/course/TopicQuestionModel';
import { prisma } from '@/prisma';
import { MutationSubmitGitCourseTopicArgs } from '@/graphql/generated/graphql';
import { verifyJwtForRequest } from '@/graphql/mutations/helper/verifyJwtForRequest';
import { getGitCourseFromRedis } from '@/helpers/course/gitCourseReader';
import { postTopicSubmission } from '@/helpers/discord/webhookMessage';
import { IncomingMessage } from 'http';
import intersection from 'lodash/intersection';
import isEqual from 'lodash/isEqual';
import partition from 'lodash/partition';

export default async function submitGitCourseTopicMutation(_: unknown, args: MutationSubmitGitCourseTopicArgs, context: IncomingMessage) {
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

    if (!topicModel) {
      throw new Error(`No topic found: ${spaceId} - ${courseKey} - ${topicKey}`);
    }

    if (!topicSubmission) {
      throw new Error(`No submission found: ${spaceId} - ${courseKey} - ${topicKey}`);
    }

    const submissionQuestionsMap: { [uuid in string]: CourseQuestionSubmission } = Object.fromEntries(
      topicSubmission.submission.questions.map((q: CourseQuestionSubmission) => [q.uuid, q])
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

    const submitTopicArgs = {
      questionsAttempted: topicSubmission.submission.questions.length,
      questionsCorrect: correctAndIncorrectQuestions[0].length,
      questionsIncorrect: correctAndIncorrectQuestions[1].length,
      questionsSkipped: 0,
      correctAnswers: (topicModel.questions || []).map((q) => ({ uuid: q.uuid, answerKeys: q.answerKeys })),
    };

    // This is done just to refresh the updated_at
    await prisma.gitCourseSubmission.update({
      where: {
        uuid: submissionUuid,
      },
      data: {},
    });

    await prisma.gitCourseTopicSubmission.update({
      where: {
        uuid: submissionUuid,
      },
      data: {
        ...submitTopicArgs,
      },
    });

    const submittiedTopic = await prisma.gitCourseTopicSubmission.findFirst({ where: { uuid: submissionUuid } });

    if (process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK) {
      postTopicSubmission(process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK, space, courseJson, topicModel, submittiedTopic!);
    }

    return submittiedTopic;
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
