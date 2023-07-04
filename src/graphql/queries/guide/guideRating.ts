import { QueryGuideRatingArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function guideRating(_: any, args: QueryGuideRatingArgs) {
  return prisma.guideRating.findUniqueOrThrow({
    where: {
      ratingUuid: args.ratingUuid,
    },
  });
}
