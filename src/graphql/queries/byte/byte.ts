import { QueryByteArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';
import { prisma } from '@/prisma';
import { Byte } from '@prisma/client';

export async function getByte(spaceId: string, byteId: string, includeDraft = false) {
  let byte = await prisma.byte.findUnique({
    where: {
      id: byteId,
    },
  });

  if (!byte) {
    byte = (await getAcademyObjectFromRedis(spaceId, AcademyObjectTypes.bytes, byteId)) as Byte;
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
