import { MutationUpsertByteRatingArgs } from '@/graphql/generated/graphql';
import { getOptioanlJwt } from '@/helpers/permissions/getJwtFromContext';
import { prisma } from '@/prisma';
import { GraphqlContext } from '@/types/GraphqlContext';
import { ByteRating } from '@prisma/client';

export default async function upsertByteRating(_: unknown, args: MutationUpsertByteRatingArgs, context: GraphqlContext) {
  const decodedJWT = getOptioanlJwt(context);
  const byteRating: ByteRating = await prisma.byteRating.upsert({
    where: {
      ratingUuid: args.upsertByteRatingInput.ratingUuid,
    },
    create: {
      ratingUuid: args.upsertByteRatingInput.ratingUuid,
      rating: args.upsertByteRatingInput.rating,
      positiveFeedback: args.upsertByteRatingInput.positiveFeedback || undefined,
      negativeFeedback: args.upsertByteRatingInput.negativeFeedback || undefined,
      byteId: args.upsertByteRatingInput.byteId,
      spaceId: args.upsertByteRatingInput.spaceId,
      ipAddress: context.ip,
      skipRating: args.upsertByteRatingInput.skipRating,
      username: decodedJWT?.username,
      suggestion: args.upsertByteRatingInput.suggestion,
    },
    update: {
      rating: args.upsertByteRatingInput.rating,
      positiveFeedback: args.upsertByteRatingInput.positiveFeedback || undefined,
      negativeFeedback: args.upsertByteRatingInput.negativeFeedback || undefined,
      byteId: args.upsertByteRatingInput.byteId,
      ipAddress: context.ip,
      skipRating: args.upsertByteRatingInput.skipRating,
      username: decodedJWT?.username,
    },
  });
  return byteRating;
}
