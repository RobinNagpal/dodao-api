import { ByteModel, ByteQuestion, ByteStepItem } from '@/deprecatedSchemas/models/byte/ByteModel';
import { QuestionType } from '@/deprecatedSchemas/models/enums';
import { ByteStep, MutationUpsertByteArgs, UpsertByteInput } from '@/graphql/generated/graphql';
import { transformByteInputSteps } from '@/graphql/mutations/byte/transformByteInputSteps';
import { getSpaceById } from '@/graphql/operations/space';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { writeObjectToAcademyRepo } from '@/helpers/academy/writers/academyObjectWriter';
import { logError } from '@/helpers/adapters/errorLogger';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { prisma } from '@/prisma';
import { Byte } from '@prisma/client';
import { IncomingMessage } from 'http';

async function transformInput(spaceId: string, message: UpsertByteInput): Promise<ByteModel> {
  // remove the order and add id if needed
  const byteModel: ByteModel = {
    ...message,
    id: message.id || slugify(message.name),
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
    completionScreen: message.completionScreen || null,
  };
  return byteModel;
}

export default async function upsertByte(_: unknown, { spaceId, input }: MutationUpsertByteArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(spaceId);
    const spaceIntegration = await prisma.spaceIntegration.findFirst({
      where: {
        spaceId: spaceId,
      },
    });
    const jwt = checkEditSpacePermission(spaceById, context);
    const transformedByte = await transformInput(spaceId, input);
    const steps: ByteStep[] = transformByteInputSteps(input);
    const id = input.id || slugify(input.name);
    const upsertedByte: Byte = await prisma.byte.upsert({
      create: {
        ...transformedByte,
        steps: steps,
        id: id,
        spaceId: spaceId,
        completionScreen: input.completionScreen || undefined,
      },
      update: {
        ...input,
        steps: steps,
        completionScreen: input.completionScreen || undefined,
      },
      where: {
        id: id,
      },
    });

    if (spaceIntegration?.academyRepository) {
      await writeObjectToAcademyRepo(spaceById, upsertedByte, AcademyObjectTypes.bytes, jwt.username);
    }

    return upsertedByte;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertByte', {}, e as any, null, null);
    throw e;
  }
}
