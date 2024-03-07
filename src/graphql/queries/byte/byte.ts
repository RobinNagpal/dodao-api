import { QueryByteArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';
import { logEventInDiscord } from '@/helpers/adapters/logEventInDiscord';
import { prisma } from '@/prisma';

export async function getByte(spaceId: string, byteId: string, includeDraft = false) {
  let byte = await prisma.byte.findUnique({
    where: {
      id: byteId,
    },
  });

  if (!byte) {
    logEventInDiscord(spaceId, `Byte not found in Data base: ${byteId}`);
    byte = (await getAcademyObjectFromRedis(spaceId, AcademyObjectTypes.bytes, byteId)) as any;
  }

  // If byte is still not found, throw an error or handle it appropriately
  if (!byte) {
    throw new Error('Byte not found');
  }

  return byte;
}
export default async function byte(_: any, args: QueryByteArgs) {
  return getByte(args.spaceId, args.byteId, !!args.includeDraft);
}
