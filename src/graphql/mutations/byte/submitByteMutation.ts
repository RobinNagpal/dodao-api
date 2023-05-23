import { verifyJwt } from '@/helpers/login';
import { ByteModel, isUserDiscordConnect, isUserInput, UserInput } from '@/deprecatedSchemas/models/byte/ByteModel';
import { ByteSubmission, ByteSubmissionInput, MutationSubmitByteArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';
import { logError } from '@/helpers/adapters/errorLogger';
import { postByteSubmission } from '@/helpers/discord/webhookMessage';
import { SubmissionItemInfo, UserByteQuestionSubmission, UserByteStepSubmission } from '@/helpers/types/byteSubmisstion';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { ByteSubmissionWithSteps } from '@/deprecatedSchemas/ByteSubmissionWithSteps';

function getByteStepSubmissionMap(msg: ByteSubmissionInput) {
  const stepEntries = msg.steps.map((step) => {
    const stepItemEntries = step.itemResponses.map((item) => {
      const submissionItemInfo: SubmissionItemInfo = {
        uuid: item.uuid,
        type: item.type.toString(),
        value: item.userInput || item.userDiscordInfo,
      };
      return [item.uuid, submissionItemInfo];
    });
    const itemSubmissionsMap: UserByteQuestionSubmission = Object.fromEntries(stepItemEntries);

    return [step.uuid, itemSubmissionsMap];
  });
  return Object.fromEntries(stepEntries);
}

function validateByteSubmission(byte: ByteModel, stepSubmissionsMap: UserByteStepSubmission) {
  byte.steps.forEach((step) =>
    step.stepItems.forEach((item) => {
      const isRequiredUserInput = isUserInput(item) && (item as UserInput).required;
      if (isRequiredUserInput || isUserDiscordConnect(item)) {
        if (!stepSubmissionsMap?.[step.uuid]?.[item.uuid]?.value) {
          throw Error(
            `Field is required ${JSON.stringify({
              item,
              stepResponse: stepSubmissionsMap?.[step.uuid],
              itemResponse: stepSubmissionsMap?.[step.uuid]?.[item.uuid],
            })}`
          );
        }
      }
    })
  );
}

async function doSubmitByte(user: string, msg: ByteSubmissionInput): Promise<ByteSubmission> {
  const spaceId = msg.space;

  const stepSubmissionsMap: UserByteStepSubmission = getByteStepSubmissionMap(msg);

  // eslint-disable-next-line no-undef
  const byte: ByteModel | undefined = await getAcademyObjectFromRedis(spaceId, AcademyObjectTypes.bytes, msg.byteId);

  if (!byte) {
    throw new Error(`No byte found with uuid ${msg.byteId}`);
  }

  validateByteSubmission(byte, stepSubmissionsMap);

  const submission: ByteSubmissionWithSteps = {
    id: msg.uuid,
    createdBy: user,
    byteId: byte.id,
    spaceId: spaceId,
    steps: msg.steps,
    created: new Date().toISOString(),
  };

  await prisma.byteSubmission.create({
    data: submission,
  });

  if (process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK) {
    postByteSubmission(process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK, byte, msg, stepSubmissionsMap);
  }

  return { ...submission };
}

export default async function submitByteMutation(_: unknown, byteInput: MutationSubmitByteArgs, context: IncomingMessage) {
  try {
    const decodedJWT = verifyJwt(context);
    const user = decodedJWT.accountId.toLowerCase();
    if (!user) {
      throw Error('No accountId present in JWT');
    }

    return await doSubmitByte(user, byteInput.submissionInput);
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertByte', {}, e as any, null, null);
    throw e;
  }
}
