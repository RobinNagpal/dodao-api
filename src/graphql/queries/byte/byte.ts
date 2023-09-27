import { QueryByteArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';
import { prisma } from '@/prisma';

export async function getByte(spaceId: string, byteId: string, includeDraft: boolean = false) {
  let byte;
  if (includeDraft) {
    byte = await prisma.byte.findUnique({
      where: {
        id_publishStatus: {
          id: byteId,
          publishStatus: 'Draft',
        },
      },
    });
  }

  if (!byte) {
    byte = await getAcademyObjectFromRedis(spaceId, AcademyObjectTypes.bytes, byteId);
  }

  // If byte is still not found, try to get it from the database
  if (!byte) {
    byte = await prisma.byte.findUnique({
      where: {
        id_publishStatus: {
          id: byteId,
          publishStatus: 'Draft',
        },
      },
    });
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
