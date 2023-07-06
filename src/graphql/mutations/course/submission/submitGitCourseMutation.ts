import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { CourseStatus, TopicStatus } from '@/deprecatedSchemas/models/course/GitCourseTopicSubmission';
import { prisma } from '@/prisma';
import { GitCourseSubmission, GitCourseTopicSubmission } from '@prisma/client';

import { MutationSubmitGitCourseArgs } from '@/graphql/generated/graphql';
import { verifyJwtForRequest } from '@/helpers/permissions/verifyJwtForRequest';
import { getGitCourseFromRedis } from '@/helpers/course/gitCourseReader';
import { postCourseSubmission } from '@/helpers/discord/webhookMessage';
import { updateGalaxyCredentialsForCourseSubmissionIfApplicable } from '@/helpers/galaxy/updateGalaxyCredentials';
import { IncomingMessage } from 'http';

export default async function submitGitCourseMutation(_: unknown, args: MutationSubmitGitCourseArgs, context: IncomingMessage) {
  try {
    const spaceId = args.spaceId;
    const courseSubmissionUuid = args.input.uuid;

    const { space, decodedJwt } = await verifyJwtForRequest(context, args.spaceId);

    const existingSubmission = await prisma.gitCourseSubmission.findFirstOrThrow({
      where: {
        uuid: courseSubmissionUuid,
      },
    });

    if (!existingSubmission) {
      throw new Error(`No submissionFound found: ${spaceId} - ${courseSubmissionUuid}`);
    }

    if (existingSubmission.status === CourseStatus.Submitted) {
      throw new Error(`Already Submitted: ${spaceId} - ${existingSubmission.courseKey} - ${decodedJwt.accountId} -- ${args.input.uuid}`);
    }

    const courseKey = existingSubmission.courseKey;

    const courseJson: GitCourseModel | undefined = await getGitCourseFromRedis(space.id, courseKey);

    if (!courseJson) {
      throw new Error(`No course found: ${spaceId} - ${courseKey}`);
    }

    const topicSubmissions = await prisma.gitCourseTopicSubmission.findMany({
      where: {
        spaceId: spaceId,
        courseKey: courseKey,
        createdBy: decodedJwt.userId,
      },
    });

    topicSubmissions.forEach((ts: GitCourseTopicSubmission) => {
      if (ts.status !== TopicStatus.Submitted) {
        throw new Error(`Topic not submitted: ${spaceId} - ${courseKey} - ${decodedJwt.accountId}`);
      }
    });

    courseJson.topics.forEach((topic) => {
      if (topic.questions?.length && !topicSubmissions.find((t: GitCourseTopicSubmission) => t.topicKey === topic.key)) {
        throw new Error(`No topic submission found: ${spaceId} - ${courseKey} - ${decodedJwt.accountId}`);
      }
    });

    const courseIntegrations = await prisma.courseIntegration.findFirst({
      where: {
        spaceId: spaceId,
        courseKey: courseKey,
      },
    });

    const ts = parseInt((Date.now() / 1e3).toFixed());

    const reduceInitValue: GitCourseSubmission = {
      ...existingSubmission,
      questionsAttempted: 0,
      questionsCorrect: 0,
      questionsIncorrect: 0,
      questionsSkipped: 0,
      status: CourseStatus.Submitted,
    };

    const courseSubmission = topicSubmissions.reduce(
      (courseSubmission: GitCourseSubmission, topicSubmission: GitCourseTopicSubmission): GitCourseSubmission => {
        return {
          ...courseSubmission,
          questionsAttempted: (courseSubmission.questionsAttempted || 0) + (topicSubmission.questionsAttempted ?? 0),
          questionsCorrect: (courseSubmission.questionsCorrect || 0) + (topicSubmission.questionsCorrect || 0),
          questionsIncorrect: (courseSubmission.questionsIncorrect || 0) + (topicSubmission.questionsIncorrect || 0),
          questionsSkipped: (courseSubmission.questionsSkipped || 0) + (topicSubmission.questionsSkipped || 0),
        };
      },
      reduceInitValue,
    );

    const spaceIntegration = await prisma.spaceIntegration.findFirst({
      where: {
        spaceId: spaceId,
      },
    });

    const galaxyCredentialsUpdated = courseIntegrations
      ? await updateGalaxyCredentialsForCourseSubmissionIfApplicable(spaceIntegration, courseIntegrations, courseSubmission, decodedJwt.accountId)
      : false;

    const savedSubmission = await prisma.gitCourseSubmission.update({
      where: {
        uuid: courseSubmissionUuid,
      },
      data: {
        ...courseSubmission,
        galaxyCredentialsUpdated: galaxyCredentialsUpdated,
      },
    });

    if (courseIntegrations?.discordWebhook) {
      postCourseSubmission(courseIntegrations.discordWebhook, space, courseJson, savedSubmission);
    }

    if (process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK) {
      postCourseSubmission(process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK, space, courseJson, savedSubmission);
    }

    return { ...savedSubmission, topicSubmissions };
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
