import { ConsolidatedGuideRating, QueryConsolidatedGuideRatingArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { consolidateGuideRatings } from '@/graphql/queries/guide/consolidateGuideRatings';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { GuideRating } from '@prisma/client';
import { IncomingMessage } from 'http';

export default async function consolidatedGuideRating(
  _: any,
  args: QueryConsolidatedGuideRatingArgs,
  context: IncomingMessage,
): Promise<ConsolidatedGuideRating | undefined> {
  const { spaceId, guideUuid } = args;
  const spaceById = await getSpaceById(spaceId);
  checkEditSpacePermission(spaceById, context);

  const ratings: Pick<GuideRating, 'endRating' | 'positiveFeedback' | 'negativeFeedback'>[] = await prisma.guideRating.findMany({
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
  return consolidateGuideRatings(ratings);
}
