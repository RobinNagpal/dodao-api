import { QueryGuidesArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function shortVideos(_: any, args: QueryGuidesArgs) {
  return prisma.shortVideo.findMany({
    where: {
      spaceId: args.spaceId,
    },
  });
}
