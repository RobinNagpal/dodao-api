import { QueryWebsiteScrapingInfosArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function websiteScrapingInfos(_: any, args: QueryWebsiteScrapingInfosArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);
  return prisma.websiteScrapingInfo.findMany({
    where: {
      spaceId: args.spaceId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}
