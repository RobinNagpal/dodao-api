import { MutationUpsertGuideRatingArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';
import { Context } from '@/types/Context';

export default async function upsertGuideRating(_: unknown, args: MutationUpsertGuideRatingArgs, context: Context) {
  return prisma.guideRating.upsert({
    where: {
      ratingUuid: args.upsertGuideRatingInput.ratingUuid,
    },
    create: {
      ratingUuid: args.upsertGuideRatingInput.ratingUuid,
      startRating: args.upsertGuideRatingInput.startRating,
      endRating: args.upsertGuideRatingInput.endRating,
      positiveFeedback: args.upsertGuideRatingInput.positiveFeedback,
      negativeFeedback: args.upsertGuideRatingInput.negativeFeedback,
      guideUuid: args.upsertGuideRatingInput.guideUuid,
      spaceId: args.upsertGuideRatingInput.spaceId,
      ipAddress: context.ip,
    },
    update: {
      startRating: args.upsertGuideRatingInput.startRating,
      endRating: args.upsertGuideRatingInput.endRating,
      positiveFeedback: args.upsertGuideRatingInput.positiveFeedback,
      negativeFeedback: args.upsertGuideRatingInput.negativeFeedback,
      guideUuid: args.upsertGuideRatingInput.guideUuid,
      ipAddress: context.ip,
    },
  });
}
