import { QueryByteSocialShareArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function byteSocialShare(_: any, args: QueryByteSocialShareArgs) {
  const byteSocialShare = await prisma.byteSocialShare.findUnique({
    where: {
      byteId_spaceId: {
        byteId: args.byteId,
        spaceId: args.spaceId,
      },
    },
  });

  console.log('byteSocialShare', byteSocialShare);
  return byteSocialShare;
}
