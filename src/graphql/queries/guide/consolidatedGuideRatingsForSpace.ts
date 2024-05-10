import { ConsolidatedGuideRating, QueryConsolidatedGuideRatingsForSpaceArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { consolidateGuideRatings } from '@/graphql/queries/guide/consolidateGuideRatings';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function consolidatedGuideRatingsForSpace(
  _: any,
  args: QueryConsolidatedGuideRatingsForSpaceArgs,
  context: IncomingMessage,
): Promise<ConsolidatedGuideRating | undefined> {
  const { spaceId } = args;
  const spaceById = await getSpaceById(spaceId);
  checkEditSpacePermission(spaceById, context);

  const ratings = await prisma.guideRating.findMany({
    where: {
      NOT: {
        endRating: null,
      },
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
