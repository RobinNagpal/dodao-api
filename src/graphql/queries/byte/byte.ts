import { QueryByteArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';
import { prisma } from '@/prisma';

export default async function byte(_: any, args: QueryByteArgs) {
  if (args.includeDraft) {
    const byte = await prisma.byte.findUnique({
      where: {
        id_publishStatus: {
          id: args.byteId,
          publishStatus: 'Draft',
        },
      },
    });
    if (byte) {
      return byte;
    }
  }

  return getAcademyObjectFromRedis(args.spaceId, AcademyObjectTypes.bytes, args.byteId);
}
