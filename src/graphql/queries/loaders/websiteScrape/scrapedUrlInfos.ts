import { QueryScrapedUrlInfosArgs, ScrapedUrlInfo as ScrapedUrlInfoGraphql } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { ScrapedUrlInfo } from '@prisma/client';

import { IncomingMessage } from 'http';

export default async function scrapedUrlInfos(_: any, args: QueryScrapedUrlInfosArgs, context: IncomingMessage): Promise<ScrapedUrlInfoGraphql[]> {
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
  return scrapedUrlInfos.map((scrapedUrlInfo: ScrapedUrlInfo) => ({
    ...scrapedUrlInfo,
    textLength: scrapedUrlInfo.text.length,
    textSample: scrapedUrlInfo.text.slice(0, 200),
    text: scrapedUrlInfo.text,
    websiteScrapingInfoId: scrapedUrlInfo.websiteScrapingInfoId,
  }));
}
