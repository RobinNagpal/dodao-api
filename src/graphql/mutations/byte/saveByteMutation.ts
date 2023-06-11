import { prisma } from '@/prisma';
import { ByteModel, ByteQuestion, ByteStepItem } from '@/deprecatedSchemas/models/byte/ByteModel';
import { PublishStatus, QuestionType } from '@/deprecatedSchemas/models/enums';
import { UpsertByteInput, MutationSaveByteArgs } from '@/graphql/generated/graphql';
import { logError } from '@/helpers/adapters/errorLogger';
import { slugify } from '@/helpers/space/slugify';
import { IncomingMessage } from 'http';
import { v4 as uuidv4 } from 'uuid';

async function transformInput(spaceId: string, message: UpsertByteInput): Promise<ByteModel> {
  // remove the order and add id if needed
  const byteModel: ByteModel = {
    ...message,
    id: message.id || slugify(message.name),
    publishStatus: message.publishStatus as PublishStatus,
    steps: message.steps.map((s, i) => ({
      ...s,
      order: undefined,
      uuid: uuidv4(), // generate new uuid for each step
      stepItems: ((s.stepItems || []) as ByteStepItem[]).map((si, order) => {
        if (si.type === QuestionType.MultipleChoice || si.type === QuestionType.SingleChoice) {
          const question = si as ByteQuestion;
          if (!question.explanation) {
            throw Error(`explanation is missing in byte question - ${spaceId} - ${byteModel.name}`);
          }
        }
        return {
          ...si,
          order: undefined,
          uuid: uuidv4(), // generate new uuid for each step item
        };
      }),
    })),
  };
  return byteModel;
}

export default async function saveByteMutation(_: unknown, { spaceId, input }: MutationSaveByteArgs, context: IncomingMessage) {
  try {
    const spaceById = await prisma.space.findUnique({ where: { id: spaceId } });
    if (!spaceById) {
      throw new Error('Space not found');
    }

    const transformedByte = await transformInput(spaceId, input);

    const transformedSteps = transformedByte.steps.map((step) => ({
      name: step.name,
      uuid: step.uuid,
      content: step.content,
      stepItems: JSON.stringify(step.stepItems),
    }));

    const savedObject = await prisma.byte.create({
      data: {
        ...transformedByte,
        idx: uuidv4(), // generate new uuid for each byte
        steps: {
          create: transformedSteps,
        },
        postSubmissionStepContent: 'Dummy value',
        spaceId: spaceId,
      },
    });

    return savedObject;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in saveByte', {}, e as any, null, null);
    throw e;
  }
}
