import { QueryByteArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';
import { prisma } from '@/prisma';

export default async function byte(_: any, args: QueryByteArgs) {
  let byte;
  if (args.includeDraft) {
    byte = await prisma.byte.findUnique({
      where: {
        id_publishStatus: {
          id: args.byteId,
          publishStatus: 'Draft',
        },
      },
    });
  }

  if (!byte) {
    byte = await getAcademyObjectFromRedis(args.spaceId, AcademyObjectTypes.bytes, args.byteId);
  }

  // If byte is still not found, try to get it from the database
  if (!byte) {
    byte = await prisma.byte.findUnique({
      where: {
        id_publishStatus: {
          id: args.byteId,
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
