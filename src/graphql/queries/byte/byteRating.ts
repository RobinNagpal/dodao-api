import { QueryByteRatingArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function byteRating(_: any, args: QueryByteRatingArgs) {
  return prisma.byteRating.findUniqueOrThrow({
    where: {
      ratingUuid: args.ratingUuid,
    },
  });
}
