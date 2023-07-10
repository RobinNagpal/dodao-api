import { MutationUpsertGuideRatingArgs } from '@/graphql/generated/graphql';
import { getOptioanlJwt } from '@/helpers/permissions/getJwtFromContext';
import { prisma } from '@/prisma';
import { GraphqlContext } from '@/types/GraphqlContext';
import { GuideRating } from '@prisma/client';

export default async function upsertGuideRating(_: unknown, args: MutationUpsertGuideRatingArgs, context: GraphqlContext) {
  const decodedJWT = getOptioanlJwt(context);
  const guideRating: GuideRating = await prisma.guideRating.upsert({
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
      skipEndRating: args.upsertGuideRatingInput.skipEndRating,
      skipStartRating: args.upsertGuideRatingInput.skipStartRating,
      username: decodedJWT?.username,
    },
    update: {
      startRating: args.upsertGuideRatingInput.startRating,
      endRating: args.upsertGuideRatingInput.endRating,
      positiveFeedback: args.upsertGuideRatingInput.positiveFeedback || undefined,
      negativeFeedback: args.upsertGuideRatingInput.negativeFeedback || undefined,
      guideUuid: args.upsertGuideRatingInput.guideUuid,
      ipAddress: context.ip,
      skipEndRating: args.upsertGuideRatingInput.skipEndRating,
      skipStartRating: args.upsertGuideRatingInput.skipStartRating,
      username: decodedJWT?.username,
    },
  });
  return guideRating;
}
