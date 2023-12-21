import { ByteModel, ByteQuestion, ByteStepItem } from '@/deprecatedSchemas/models/byte/ByteModel';
import { PublishStatus, QuestionType, VisibilityEnum } from '@/deprecatedSchemas/models/enums';
import { ByteStep, MutationUpsertByteArgs, UpsertByteInput } from '@/graphql/generated/graphql';
import { transformByteInputSteps } from '@/graphql/mutations/byte/transformByteInputSteps';
import { getSpaceById } from '@/graphql/operations/space';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { writeObjectToAcademyRepo } from '@/helpers/academy/writers/academyObjectWriter';
import { logError } from '@/helpers/adapters/errorLogger';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { prisma } from '@/prisma';
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

export default async function upsertByte(_: unknown, { spaceId, input }: MutationUpsertByteArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(spaceId);

    checkEditSpacePermission(spaceById, context);
    const transformedByte = await transformInput(spaceId, input);

    const steps: ByteStep[] = transformByteInputSteps(input);
    const id = input.id || slugify(input.name);
    const upsertedByte = await prisma.byte.upsert({
      create: {
        ...input,
        steps: steps,
        id: id,
        spaceId: spaceId,
        publishStatus: PublishStatus.Live,
        visibility: VisibilityEnum.Public,
      },
      update: {
        ...input,
        steps: steps,
        publishStatus: PublishStatus.Live,
        visibility: VisibilityEnum.Public,
      },
      where: {
        id: id,
      },
    });

    const upsertedObject = await writeObjectToAcademyRepo(spaceById, transformedByte, AcademyObjectTypes.bytes, '123456789');

    return upsertedObject;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertByte', {}, e as any, null, null);
    throw e;
  }
}
