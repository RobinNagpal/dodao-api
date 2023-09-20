import { QueryScrapedUrlInfosArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';

import { IncomingMessage } from 'http';

export default async function scrapedUrlInfos(_: any, args: QueryScrapedUrlInfosArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);
  return prisma.scrapedUrlInfo.findMany({
    where: {
      spaceId: args.spaceId,
      websiteScrapingInfoId: args.websiteScrapingInfoId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
