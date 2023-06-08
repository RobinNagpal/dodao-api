import { prisma } from '@/prisma';
import { ByteModel, ByteQuestion, ByteStepItem } from '@/deprecatedSchemas/models/byte/ByteModel';
import { PublishStatus, QuestionType } from '@/deprecatedSchemas/models/enums';
import { MutationUpsertByteArgs, UpsertByteInput } from '@/graphql/generated/graphql';
//import { getSpaceById } from '@/graphql/operations/space';
import { logError } from '@/helpers/adapters/errorLogger';
//import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { IncomingMessage } from 'http';

async function transformInput(spaceId: string, message: UpsertByteInput): Promise<ByteModel> {
  // remove the order and add id if needed
  const byteModel: ByteModel = {
    ...message,
    id: message.id || slugify(message.name),
    publishStatus: message.publishStatus as PublishStatus,
    steps: message.steps.map((s, i) => ({
      ...s,
      order: undefined,
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
        };
      }),
    })),
  };
  return byteModel;
}

export default async function saveByteMutation(_: unknown, { spaceId, input }: MutationUpsertByteArgs, context: IncomingMessage) {
  try {
    // find space by id and check edit permissions
    const spaceById = await prisma.space.findUnique({ where: { id: spaceId } });
    if (!spaceById) {
      throw new Error('Space not found');
    }
    //const decodedJwt = checkEditSpacePermission(spaceById, context);

    const transformedByte = await transformInput(spaceId, input);

    const transformedSteps = transformedByte.steps.map((step) => ({
      name: step.name,
      uuid: step.uuid,
      byteId: transformedByte.id,
      content: step.content,
      stepItems: JSON.stringify(step.stepItems),
    }));

    const savedObject = await prisma.byte.create({
      data: {
        ...transformedByte,
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
