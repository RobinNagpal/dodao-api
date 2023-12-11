import { QueryGuidesArgs } from '@/graphql/generated/graphql';
import { getAllAcademyGuidesForSpace } from '@/helpers/academy/readers/academyGuideReader';
import { prisma } from '@/prisma';

export default async function shortVideos(_: any, args: QueryGuidesArgs) {
  return prisma.shortVideo.findMany({
    where: {
      spaceId: args.spaceId,
    },
  });
}
