import { MutationCreateWebsiteScrapingInfoArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export default async function createWebsiteScrapingInfo(_: any, args: MutationCreateWebsiteScrapingInfoArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  const websiteScrapingInfo = await prisma.websiteScrapingInfo.create({
    data: {
      id: v4(),
      spaceId: args.spaceId,
      host: args.host,
      scrapingStartUrl: args.scrapingStartUrl,
      ignoreHashInUrl: args.ignoreHashInUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return websiteScrapingInfo;
}
