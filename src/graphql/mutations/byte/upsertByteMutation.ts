import { ByteModel, ByteQuestion, ByteStepItem } from '@/deprecatedSchemas/models/byte/ByteModel';
import { PublishStatus, QuestionType } from '@/deprecatedSchemas/models/enums';
import { MutationUpsertByteArgs, UpsertByteInput } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { writeObjectToAcademyRepo } from '@/helpers/academy/writers/academyObjectWriter';
import { logError } from '@/helpers/adapters/errorLogger';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
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

export default async function upsertByteMutation(_: unknown, { spaceId, input }: MutationUpsertByteArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(spaceId);
    if (!spaceById) throw new Error(`No space found: ${spaceId}`);

    const decodedJwt = checkEditSpacePermission(spaceById, context);
    const transformedByte = await transformInput(spaceId, input);

    // const upsertedObject = await writeObjectToAcademyRepo(spaceById, transformedGuide, AcademyObjectTypes.bytes, decodedJwt.accountId);

    return transformedByte;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertByte', {}, e as any, null, null);
    throw e;
  }
}
