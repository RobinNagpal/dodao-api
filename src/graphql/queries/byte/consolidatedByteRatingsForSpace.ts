import { ConsolidatedByteRating, QueryConsolidatedByteRatingArgs, QueryConsolidatedByteRatingsForSpaceArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { consolidateByteRatings } from '@/graphql/queries/byte/consolidateByteRatings';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { ByteRating } from '@prisma/client';
import { IncomingMessage } from 'http';

export default async function consolidatedByteRatingsForSpace(
  _: any,
  args: QueryConsolidatedByteRatingsForSpaceArgs,
  context: IncomingMessage,
): Promise<ConsolidatedByteRating | undefined> {
  const { spaceId } = args;
  const spaceById = await getSpaceById(spaceId);
  checkEditSpacePermission(spaceById, context);

  const ratings: Array<Pick<ByteRating, 'rating' | 'positiveFeedback' | 'negativeFeedback'>> = await prisma.byteRating.findMany({
    where: {
      NOT: {
        rating: null,
      },
      spaceId,
    },
    select: {
      rating: true,
      positiveFeedback: true,
      negativeFeedback: true,
    },
  });
  return consolidateByteRatings(ratings);
}
