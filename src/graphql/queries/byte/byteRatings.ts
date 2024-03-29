import { QueryByteRatingsArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function byteRatings(_: any, args: QueryByteRatingsArgs) {
  return prisma.byteRating.findMany({
    where: {
      NOT: {
        rating: null,
      },
      byteId: args.byteId,
      spaceId: args.spaceId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 200,
  });
}
