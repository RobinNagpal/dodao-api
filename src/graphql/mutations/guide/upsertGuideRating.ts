import { MutationUpsertGuideRatingArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';
import { GraphqlContext } from '@/types/GraphqlContext';

export default async function upsertGuideRating(_: unknown, args: MutationUpsertGuideRatingArgs, context: GraphqlContext) {
  return prisma.guideRating.upsert({
    where: {
      ratingUuid: args.upsertGuideRatingInput.ratingUuid,
    },
    create: {
      ratingUuid: args.upsertGuideRatingInput.ratingUuid,
      startRating: args.upsertGuideRatingInput.startRating,
      endRating: args.upsertGuideRatingInput.endRating,
      positiveFeedback: args.upsertGuideRatingInput.positiveFeedback || undefined,
      negativeFeedback: args.upsertGuideRatingInput.negativeFeedback || undefined,
      guideUuid: args.upsertGuideRatingInput.guideUuid,
      spaceId: args.upsertGuideRatingInput.spaceId,
      ipAddress: context.ip,
    },
    update: {
      startRating: args.upsertGuideRatingInput.startRating,
      endRating: args.upsertGuideRatingInput.endRating,
      positiveFeedback: args.upsertGuideRatingInput.positiveFeedback || undefined,
      negativeFeedback: args.upsertGuideRatingInput.negativeFeedback || undefined,
      guideUuid: args.upsertGuideRatingInput.guideUuid,
      ipAddress: context.ip,
    },
  });
}
