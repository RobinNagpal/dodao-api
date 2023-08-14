import { QueryGuideRatingsArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function guideRatings(_: any, args: QueryGuideRatingsArgs) {
  return prisma.guideRating.findMany({
    where: {
      NOT: {
        endRating: null,
      },
      guideUuid: args.guideUuid,
      spaceId: args.spaceId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 200,
  });
}
