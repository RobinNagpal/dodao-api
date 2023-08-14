import { ConsolidatedGuideRating, QueryConsolidatedGuideRatingArgs, QueryGuideSubmissionsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function consolidatedGuideRating(
  _: any,
  args: QueryConsolidatedGuideRatingArgs,
  context: IncomingMessage,
): Promise<ConsolidatedGuideRating | undefined> {
  const { spaceId, guideUuid } = args;
  const spaceById = await getSpaceById(spaceId);
  checkEditSpacePermission(spaceById, context);

  const ratings = await prisma.guideRating.findMany({
    where: {
      NOT: {
        endRating: null,
      },
      guideUuid,
      spaceId,
    },
    select: {
      endRating: true,
      positiveFeedback: true,
      negativeFeedback: true,
    },
  });

  if (ratings.length > 0) {
    const totalRatings = ratings.length;
    let totalRatingSum = 0;

    const positiveCount = { ux: 0, content: 0, questions: 0 };
    const negativeCount = { ux: 0, content: 0, questions: 0 };

    let positiveFeedbackCount = 0;
    let negativeFeedbackCount = 0;
    let endRatingFeedbackCount = 0;

    for (const rating of ratings) {
      if (rating.endRating !== null) {
        totalRatingSum += rating.endRating;
        endRatingFeedbackCount++;
      }

      if (rating.positiveFeedback?.ux) positiveCount.ux += 1;
      if (rating.positiveFeedback?.content) positiveCount.content += 1;
      if (rating.positiveFeedback?.questions) positiveCount.questions += 1;

      // Counting positive feedbacks (at least one true value)
      if (rating.positiveFeedback?.ux || rating.positiveFeedback?.content || rating.positiveFeedback?.questions) {
        positiveFeedbackCount++;
      }

      if (rating.negativeFeedback?.ux) negativeCount.ux += 1;
      if (rating.negativeFeedback?.content) negativeCount.content += 1;
      if (rating.negativeFeedback?.questions) negativeCount.questions += 1;

      // Counting negative feedbacks (at least one true value)
      if (rating.negativeFeedback?.ux || rating.negativeFeedback?.content || rating.negativeFeedback?.questions) {
        negativeFeedbackCount++;
      }
    }

    const avgRating = totalRatingSum / totalRatings;

    return {
      avgRating,
      positiveRatingDistribution: {
        ux: (positiveCount.ux / positiveFeedbackCount) * 100,
        content: (positiveCount.content / positiveFeedbackCount) * 100,
        questions: (positiveCount.questions / positiveFeedbackCount) * 100,
      },
      negativeRatingDistribution: {
        ux: (negativeCount.ux / negativeFeedbackCount) * 100,
        content: (negativeCount.content / negativeFeedbackCount) * 100,
        questions: (negativeCount.questions / negativeFeedbackCount) * 100,
      },
      positiveFeedbackCount,
      negativeFeedbackCount,
      endRatingFeedbackCount,
    };
  }
}
