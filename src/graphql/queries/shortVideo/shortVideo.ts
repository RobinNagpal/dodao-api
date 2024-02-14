import { QueryShortVideoArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default function shortVideo(_: any, { spaceId, id }: QueryShortVideoArgs) {
  return prisma.shortVideo.findFirstOrThrow({
    where: {
      spaceId: spaceId,
      id: id,
    },
  });
}
