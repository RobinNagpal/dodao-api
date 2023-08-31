import { isQuestion, isUserDiscordConnect, isUserInput } from '@/deprecatedSchemas/helpers/stepItemTypes';
import { GuideModel, GuideQuestion, UserInput } from '@/deprecatedSchemas/models/GuideModel';
import { GuideSubmissionInput, GuideSubmissionResult, MutationSubmitGuideArgs, GuideSubmission as GuideSubmissionGraphql } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { getAcademyGuideFromRedis } from '@/helpers/academy/readers/academyGuideReader';
import { postGuideSubmission } from '@/helpers/discord/webhookMessage';
import { updateGalaxyCredentialsForGuideSubmissionIfApplicable } from '@/helpers/galaxy/updateGalaxyCredentials';
import { getOptioanlJwt } from '@/helpers/permissions/getJwtFromContext';
import { SubmissionItemInfo, UserGuideQuestionSubmission, UserGuideStepSubmission } from '@/helpers/types/guideSubmisstion';
import { prisma } from '@/prisma';
import { GraphqlContext } from '@/types/GraphqlContext';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { GuideSubmission } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import intersection from 'lodash/intersection';
import isEqual from 'lodash/isEqual';

function getGuideStepSubmissionMap(msg: GuideSubmissionInput) {
  const stepEntries = msg.steps.map((step) => {
    const stepItemEntries = step.itemResponses.map((question) => {
      const submissionItemInfo: SubmissionItemInfo = {
        type: question.type.toString(),
        value: question.selectedAnswerKeys || question.userInput || question.userDiscordInfo,
      };
      return [question.uuid, submissionItemInfo];
    });
    const questionSubmissionsMap: UserGuideQuestionSubmission = Object.fromEntries(stepItemEntries);

    return [step.uuid, questionSubmissionsMap];
  });
  return Object.fromEntries(stepEntries);
}

function validateGuideSubmission(guide: GuideModel, stepSubmissionsMap: UserGuideStepSubmission) {
  guide.steps.forEach((step) =>
    step.stepItems.forEach((item) => {
      const isRequiredUserInput = isUserInput(item) && (item as UserInput).required;
      if (isRequiredUserInput || isUserDiscordConnect(item)) {
        if (!stepSubmissionsMap?.[step.uuid]?.[item.uuid]?.value) {
          throw Error('Field is required');
        }
      }
    }),
  );
}

async function doSubmitGuide(
  user: (JwtPayload & DoDaoJwtTokenPayload) | undefined,
  msg: GuideSubmissionInput,
  context: GraphqlContext,
): Promise<GuideSubmissionGraphql> {
  const spaceId = msg.space;

  const stepSubmissionsMap: UserGuideStepSubmission = getGuideStepSubmissionMap(msg);

  const guide = await getAcademyGuideFromRedis(spaceId, msg.guideUuid);

  if (!guide) {
    throw new Error(`No guide found with uuid ${msg.guideUuid}`);
  }

  validateGuideSubmission(guide, stepSubmissionsMap);

  const initial: GuideSubmissionResult = {
    correctQuestions: [],
    wrongQuestions: [],
    allQuestions: [],
  };

  const guideResult = guide.steps.reduceRight<GuideSubmissionResult>((result, { uuid, stepItems }) => {
    const stepSubmission = stepSubmissionsMap[uuid];
    const stepResults: GuideSubmissionResult = {
      correctQuestions: [],
      wrongQuestions: [],
      allQuestions: [],
    };

    const questionsItems = (stepItems || []).filter((si) => isQuestion(si));
    for (const questionItem of questionsItems) {
      if (isQuestion(questionItem)) {
        const question = questionItem as GuideQuestion;
        const answers = (stepSubmission?.[question.uuid].value as string[]) ?? [];
        // We do the intersection to make sure there are no obsolete answer keys. There was a bug which didn't delete the obsolete answer keys
        const answerKeys = intersection(
          question.answerKeys,
          question.choices.map((choice) => choice.key),
        );
        const isCorrect = isEqual(answers.sort(), answerKeys.sort());
        if (isCorrect) {
          stepResults.correctQuestions.push(question.uuid);
        } else {
          stepResults.wrongQuestions.push(question.uuid);
        }

        stepResults.allQuestions.push(question.uuid);
      }
    }

    const mergedResult: GuideSubmissionResult = {
      correctQuestions: [...result.correctQuestions, ...stepResults.correctQuestions],
      wrongQuestions: [...result.wrongQuestions, ...stepResults.wrongQuestions],
      allQuestions: [...result.allQuestions, ...stepResults.allQuestions],
    };

    return mergedResult;
  }, initial);

  const submission: GuideSubmission = await prisma.guideSubmission.create({
    data: {
      id: msg.uuid,
      createdBy: user?.accountId.toLowerCase() || 'anonymous',
      createdByUsername: user?.username || 'anonymous',
      guideId: guide.id,
      guideUuid: msg.guideUuid,
      result: guideResult,
      spaceId: spaceId,
      steps: msg.steps,
      createdAt: new Date().toISOString(),
      uuid: msg.uuid,
      ipAddress: context.ip,
      correctQuestionsCount: guideResult.correctQuestions.length,
    },
  });

  if (guide.guideIntegrations.discordWebhook) {
    postGuideSubmission(guide.guideIntegrations.discordWebhook, guide, msg, guideResult, stepSubmissionsMap);
  }

  if (process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK) {
    postGuideSubmission(process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK, guide, msg, guideResult, stepSubmissionsMap);
  }

  const spaceIntegrations = await prisma.spaceIntegration.findUnique({
    where: {
      spaceId: spaceId,
    },
  });

  const galaxyCredentialsUpdated = await updateGalaxyCredentialsForGuideSubmissionIfApplicable(
    spaceIntegrations,
    guide,
    submission,
    user?.accountId || 'anonymous',
  );

  return { ...submission, galaxyCredentialsUpdated: !!galaxyCredentialsUpdated };
}

export default async function submitGuide(parent: any, guideInput: MutationSubmitGuideArgs, context: GraphqlContext) {
  const space = await getSpaceById(guideInput.submissionInput.space);
  const decodedJWT = getOptioanlJwt(context);
  const user = decodedJWT?.accountId.toLowerCase();

  if (!user && space.authSettings.enableLogin && space.guideSettings.askForLoginToSubmit) {
    throw new Error('You must be logged in to submit a guide');
  }

  return await doSubmitGuide(decodedJWT, guideInput.submissionInput, context);
}
