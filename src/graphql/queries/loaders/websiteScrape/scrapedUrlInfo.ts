import { QueryScrapedUrlInfoArgs, ScrapedUrlInfo as ScrapedUrlInfoGraphql } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';

import { IncomingMessage } from 'http';

export default async function scrapedUrlInfo(_: any, args: QueryScrapedUrlInfoArgs, context: IncomingMessage): Promise<ScrapedUrlInfoGraphql> {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);
  const scrapedUrlInfo = await prisma.scrapedUrlInfo.findUniqueOrThrow({
    where: {
      id: args.scrapedUrlInfoId,
    },
  });
  return { ...scrapedUrlInfo, textLength: scrapedUrlInfo.text.length, textSample: scrapedUrlInfo.text.slice(0, 200), text: scrapedUrlInfo.text };
}
