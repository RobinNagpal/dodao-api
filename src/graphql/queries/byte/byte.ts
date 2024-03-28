import { ByteQuestion, ByteStepItem } from '@/deprecatedSchemas/models/byte/ByteModel';
import { QuestionType } from '@/deprecatedSchemas/models/enums';
import { QueryByteArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';
import { logEventInDiscord } from '@/helpers/adapters/logEventInDiscord';
import { prisma } from '@/prisma';
import { Byte } from '@prisma/client';

export async function getByte(spaceId: string, byteId: string) {
  let byte = await prisma.byte.findUnique({
    where: {
      id: byteId,
    },
  });

  if (!byte) {
    logEventInDiscord(spaceId, `Byte not found in Data base: ${byteId}`);
    byte = (await getAcademyObjectFromRedis(spaceId, AcademyObjectTypes.bytes, byteId)) as any;
    if (byte) {
      const newByte: Byte = {
        ...byte,
        id: byte.id,
        steps: byte.steps.map((s, i) => ({
          ...s,
          order: undefined,
          stepItems: ((s.stepItems || []) as ByteStepItem[]).map((si, order) => {
            if (si.type === QuestionType.MultipleChoice || si.type === QuestionType.SingleChoice) {
              const question = si as ByteQuestion;
              if (!question.explanation) {
                throw Error(`explanation is missing in byte question - ${spaceId} - ${newByte.name}`);
              }
            }
            return {
              ...si,
              order: undefined,
            };
          }),
        })),
        completionScreen: byte.completionScreen || null,
      };

      byte = await prisma.byte.create({
        data: { ...newByte, completionScreen: newByte.completionScreen || undefined },
      });
    }
  }

  // If byte is still not found, throw an error or handle it appropriately
  if (!byte) {
    throw new Error('Byte not found');
  }

  return byte;
}
export default async function byte(_: any, args: QueryByteArgs) {
  return getByte(args.spaceId, args.byteId);
}
