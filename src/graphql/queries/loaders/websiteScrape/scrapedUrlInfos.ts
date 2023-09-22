import { QueryScrapedUrlInfosArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';

import { IncomingMessage } from 'http';

export default async function scrapedUrlInfos(_: any, args: QueryScrapedUrlInfosArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);
  const scrapedUrlInfos = await prisma.scrapedUrlInfo.findMany({
    where: {
      spaceId: args.spaceId,
      websiteScrapingInfoId: args.websiteScrapingInfoId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return scrapedUrlInfos.map((scrapedUrlInfo) => ({
    ...scrapedUrlInfo,
    textLength: scrapedUrlInfo.text.length,
    text: scrapedUrlInfo.text.slice(0, 200),
  }));
}
