import { QueryByteArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export async function getByte(spaceId: string, byteId: string, includeDraft = false) {
  let byte = await prisma.byte.findUnique({
    where: {
      id: byteId,
    },
  });

  if (!byte) {
    throw new Error('Byte not found');
  }

  return byte;
}
export default async function byte(_: any, args: QueryByteArgs) {
  return getByte(args.spaceId, args.byteId, !!args.includeDraft);
}
