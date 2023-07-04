import { QueryGuideRatingsArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function guideRatings(_: any, args: QueryGuideRatingsArgs) {
  return prisma.guideRating.findMany({
    where: {
      guideUuid: args.guideUuid,
      spaceId: args.spaceId,
    },
  });
}
