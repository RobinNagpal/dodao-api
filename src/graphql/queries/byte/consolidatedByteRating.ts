import { ConsolidatedByteRating, QueryConsolidatedByteRatingArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { consolidateByteRatings } from '@/graphql/queries/byte/consolidateByteRatings';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { ByteRating } from '@prisma/client';
import { IncomingMessage } from 'http';

export default async function consolidatedByteRating(
  _: any,
  args: QueryConsolidatedByteRatingArgs,
  context: IncomingMessage,
): Promise<ConsolidatedByteRating | undefined> {
  const { spaceId, byteId } = args;
  const spaceById = await getSpaceById(spaceId);
  checkEditSpacePermission(spaceById, context);

  const ratings: Array<Pick<ByteRating, 'rating' | 'positiveFeedback' | 'negativeFeedback'>> = await prisma.byteRating.findMany({
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
  return consolidateByteRatings(ratings);
}
