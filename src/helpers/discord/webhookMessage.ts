import { isUserDiscordConnect, isUserInput } from '@/deprecatedSchemas/helpers/stepItemTypes';
import { ByteModel, ByteStep } from '@/deprecatedSchemas/models/byte/ByteModel';
import { GitCourseTopicModel } from '@/deprecatedSchemas/models/course/CourseTopics';
import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { GitCourseSubmissionModel } from '@/deprecatedSchemas/models/course/GitCourseSubmissionModel';
import { GitCourseTopicSubmissionModel } from '@/deprecatedSchemas/models/course/GitCourseTopicSubmission';
import { InputType } from '@/deprecatedSchemas/models/enums';
import { GuideModel, GuideStep, UserInput } from '@/deprecatedSchemas/models/GuideModel';
import { UserInput as ByteUserInput } from '@/deprecatedSchemas/models/byte/ByteModel';
import { prisma } from '@/prisma';
import { GitCourseSubmission, GitCourseTopicSubmission, Space } from '@prisma/client';
import axios from 'axios';
import { ByteSubmissionInput, GuideSubmissionInput, GuideSubmissionResult, UserDiscordInfo } from '@/graphql/generated/graphql';
import { logError } from '@/helpers/adapters/errorLogger';
import { UserByteStepSubmission } from '@/helpers/types/byteSubmisstion';
import { DiscordAuthor } from '@/helpers/types/discord';
import { UserGuideStepSubmission } from '@/helpers/types/guideSubmisstion';

export async function postGuideSubmission(
  url: string,
  guide: GuideModel,
  msg: GuideSubmissionInput,
  guideResult: GuideSubmissionResult,
  stepSubmissionsMap: UserGuideStepSubmission,
) {
  let author: DiscordAuthor | undefined = undefined;
  const spaceId = msg.space;

  const space = (await prisma.space.findUnique({ where: { id: spaceId } })) as Space;

  const userInputSteps = guide.steps.filter((step) => step.stepItems.some((item) => isUserInput(item) && item.type === InputType.PublicShortInput));

  const discordConnectStep = guide.steps.find((step: GuideStep) => step.stepItems.some((item) => isUserDiscordConnect(item)));
  const discordConnectItem = discordConnectStep?.stepItems.find((item) => isUserDiscordConnect(item));

  if (discordConnectStep && discordConnectItem) {
    const userDiscordInfo: UserDiscordInfo | undefined = stepSubmissionsMap?.[discordConnectStep.uuid]?.[discordConnectItem.uuid].value as UserDiscordInfo;
    if (userDiscordInfo) {
      author = {
        name: userDiscordInfo.username,
        url: `https://discordapp.com/users/${userDiscordInfo.id}`,
        icon_url: `https://cdn.discordapp.com/avatars/${userDiscordInfo.id}/${userDiscordInfo.avatar}.png`,
      };
    }
  }

  const embeds = userInputSteps.map((step) => {
    const fields = step.stepItems
      .filter((item) => isUserInput(item) && item.type === InputType.PublicShortInput)
      .map((item) => ({
        name: (item as UserInput).label,
        value: stepSubmissionsMap?.[step.uuid]?.[item.uuid]?.value || '----',
        inline: true,
      }));

    return {
      title: step.name,
      fields,
    };
  });

  const data = {
    content: `${space.name}: ${guide.name} submitted by ${msg.from} with result ${guideResult.correctQuestions.length}/${guideResult.allQuestions.length}`,
    embeds: author ? [...embeds, { title: `Discord User - ${author.name}`, author }] : embeds,
  };

  axios.post(url, data).catch((err) => {
    console.error('guideSubmission:discordWebhook', err);
    logError('Error posting submission to discord', { data }, err, spaceId, null);
  });
}

export async function postByteSubmission(url: string, byte: ByteModel, msg: ByteSubmissionInput, stepSubmissionsMap: UserByteStepSubmission) {
  let author: DiscordAuthor | undefined = undefined;
  const spaceId = msg.space;

  const space = (await prisma.space.findUnique({ where: { id: spaceId } })) as Space;

  const userInputSteps = byte.steps.filter((step) => step.stepItems.some((item) => isUserInput(item) && item.type === InputType.PublicShortInput));

  const discordConnectStep = byte.steps.find((step: ByteStep) => step.stepItems.some((item) => isUserDiscordConnect(item)));
  const discordConnectItem = discordConnectStep?.stepItems.find((item) => isUserDiscordConnect(item));

  if (discordConnectStep && discordConnectItem) {
    const userDiscordInfo: UserDiscordInfo | undefined = stepSubmissionsMap?.[discordConnectStep.uuid]?.[discordConnectItem.uuid].value as UserDiscordInfo;
    if (userDiscordInfo) {
      author = {
        name: userDiscordInfo.username,
        url: `https://discordapp.com/users/${userDiscordInfo.id}`,
        icon_url: `https://cdn.discordapp.com/avatars/${userDiscordInfo.id}/${userDiscordInfo.avatar}.png`,
      };
    }
  }

  const embeds = userInputSteps.map((step) => {
    const fields = step.stepItems
      .filter((item) => isUserInput(item) && item.type === InputType.PublicShortInput)
      .map((item) => ({
        name: (item as ByteUserInput).label,
        value: stepSubmissionsMap?.[step.uuid]?.[item.uuid]?.value || '----',
        inline: true,
      }));

    return {
      title: step.name,
      fields,
    };
  });

  const data = {
    content: `${space.name}: ${byte.name} submitted by ${msg.from}`,
    embeds: author ? [...embeds, { title: `Discord User - ${author.name}`, author }] : embeds,
  };

  axios.post(url, data).catch((err) => {
    console.error('guideSubmission:discordWebhook', err);
    logError('Error posting submission to discord', { data }, err, spaceId, null);
  });
}

export async function postTopicSubmission(
  url: string,
  space: Space,
  course: GitCourseModel,
  topic: GitCourseTopicModel,
  submissionModel: GitCourseTopicSubmission,
) {
  const embeds = [
    {
      title: `${course.title} -- ${topic.title}`,
      fields: [
        { name: 'Questions Attempted', value: submissionModel.questionsAttempted || '--', inline: true },
        { name: 'Questions Correct', value: submissionModel.questionsCorrect || '--', inline: true },
        { name: 'Questions Incorrect', value: submissionModel.questionsIncorrect || '--', inline: true },
        { name: 'Questions Skipped', value: submissionModel.questionsSkipped || '--', inline: true },
      ],
    },
  ];
  const data = {
    content: `${space.name}: ${course.title} -- ${topic.title} topic submitted by ${submissionModel.createdBy} with result ${submissionModel.questionsCorrect}/${submissionModel.questionsAttempted}`,
    embeds: embeds,
  };

  axios.post(url, data).catch((err) => {
    console.error('guideSubmission:discordWebhook', err);
    logError('Error posting submission to discord', { data }, err, space.id, null);
  });
}

export async function postCourseSubmission(url: string, space: Space, course: GitCourseModel, submissionModel: GitCourseSubmission) {
  const embeds = [
    {
      title: `${course.title}`,
      fields: [
        { name: 'Questions Attempted', value: submissionModel.questionsAttempted || '--', inline: true },
        { name: 'Questions Correct', value: submissionModel.questionsCorrect || '--', inline: true },
        { name: 'Questions Incorrect', value: submissionModel.questionsIncorrect || '--', inline: true },
        { name: 'Questions Skipped', value: submissionModel.questionsSkipped || '--', inline: true },
      ],
    },
  ];
  const data = {
    content: `${space.name}: ${course.title} course submitted by ${submissionModel.createdBy} with result ${submissionModel.questionsCorrect}/${submissionModel.questionsAttempted}`,
    embeds: embeds,
  };

  axios.post(url, data).catch((err) => {
    console.error('guideSubmission:discordWebhook', err);
    logError('Error posting submission to discord', { data }, err, space.id, null);
  });
}
