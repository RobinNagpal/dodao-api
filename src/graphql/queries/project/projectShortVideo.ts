import { QueryProjectShortVideoArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default function projectShortVideo(_: any, { projectShortVideoId }: QueryProjectShortVideoArgs) {
  return prisma.projectShortVideo.findUniqueOrThrow({
    where: {
      id: projectShortVideoId,
    },
  });
}
