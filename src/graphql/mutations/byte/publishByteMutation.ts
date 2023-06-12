import { prisma } from '@/prisma';
import { ByteModel, ByteQuestion, ByteStepItem } from '@/deprecatedSchemas/models/byte/ByteModel';
import { PublishStatus, QuestionType } from '@/deprecatedSchemas/models/enums';
import { MutationPublishByteArgs, UpsertByteInput } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { writeObjectToAcademyRepo } from '@/helpers/academy/writers/academyObjectWriter';
import { logError } from '@/helpers/adapters/errorLogger';
import { slugify } from '@/helpers/space/slugify';
import { IncomingMessage } from 'http';
import { v4 as uuidv4 } from 'uuid';

async function transformInput(spaceId: string, message: UpsertByteInput): Promise<ByteModel> {
  const byteModel: ByteModel = {
    ...message,
    id: message.id || slugify(message.name),
    publishStatus: PublishStatus.Live,
    steps: message.steps.map((s, i) => ({
      ...s,
      order: undefined,
      uuid: uuidv4(),
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
          uuid: uuidv4(),
        };
      }),
    })),
  };
  return byteModel;
}

export default async function publishByteMutation(
  _: unknown,
  { spaceId, input }: MutationPublishByteArgs & { input: UpsertByteInput },
  context: IncomingMessage
) {
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
        steps: {
          create: transformedSteps,
        },
        spaceId: spaceId,
      },
      include: {
        steps: true,
      },
    });

    const byteModel: ByteModel = {
      ...savedObject,
      steps: savedObject.steps.map((s) => ({
        ...s,
        stepItems: typeof s.stepItems === 'string' ? JSON.parse(s.stepItems) : [],
      })),
      publishStatus: savedObject.publishStatus as PublishStatus,
    };
    await writeObjectToAcademyRepo(spaceById, byteModel, AcademyObjectTypes.bytes, '123456789');

    return byteModel;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in publishByte', {}, e as any, null, null);
    throw e;
  }
}
