import { ConsolidatedByteRating, QueryConsolidatedByteRatingArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function consolidatedByteRating(
  _: any,
  args: QueryConsolidatedByteRatingArgs,
  context: IncomingMessage,
): Promise<ConsolidatedByteRating | undefined> {
  const { spaceId, byteId } = args;
  const spaceById = await getSpaceById(spaceId);
  checkEditSpacePermission(spaceById, context);

  const ratings = await prisma.byteRating.findMany({
    where: {
      NOT: {
        rating: null,
      },
      byteId,
      spaceId,
    },
    select: {
      rating: true,
      positiveFeedback: true,
      negativeFeedback: true,
    },
  });

  if (ratings.length > 0) {
    const totalRatings = ratings.length;
    let totalRatingSum = 0;

    const positiveCount = { ux: 0, content: 0 };
    const negativeCount = { ux: 0, content: 0 };

    let positiveFeedbackCount = 0;
    let negativeFeedbackCount = 0;
    let ratingFeedbackCount = 0;

    for (const rating of ratings) {
      if (rating.rating !== null) {
        totalRatingSum += rating.rating;
        ratingFeedbackCount++;
      }

      if (rating.positiveFeedback?.ux) positiveCount.ux += 1;
      if (rating.positiveFeedback?.content) positiveCount.content += 1;

      // Counting positive feedbacks (at least one true value)
      if (rating.positiveFeedback?.ux || rating.positiveFeedback?.content) {
        positiveFeedbackCount++;
      }

      if (rating.negativeFeedback?.ux) negativeCount.ux += 1;
      if (rating.negativeFeedback?.content) negativeCount.content += 1;

      // Counting negative feedbacks (at least one true value)
      if (rating.negativeFeedback?.ux || rating.negativeFeedback?.content) {
        negativeFeedbackCount++;
      }
    }

    const avgRating = totalRatingSum / totalRatings;

    return {
      avgRating,
      positiveRatingDistribution: {
        ux: (positiveCount.ux / positiveFeedbackCount) * 100 || 0,
        content: (positiveCount.content / positiveFeedbackCount) * 100 || 0,
      },
      negativeRatingDistribution: {
        ux: (negativeCount.ux / negativeFeedbackCount) * 100 || 0,
        content: (negativeCount.content / negativeFeedbackCount) * 100 || 0,
      },
      positiveFeedbackCount,
      negativeFeedbackCount,
      ratingFeedbackCount,
    };
  }
}
