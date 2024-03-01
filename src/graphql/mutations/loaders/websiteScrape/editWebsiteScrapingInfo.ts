import { MutationEditWebsiteScrapingInfoArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function editWebsiteScrapingInfo(_: any, args: MutationEditWebsiteScrapingInfoArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  const websiteScrapingInfo = await prisma.websiteScrapingInfo.update({
    where: {
      id: args.websiteScrapingInfoId,
    },
    data: {
      baseUrl: args.baseUrl,
      scrapingStartUrl: args.scrapingStartUrl,
      ignoreHashInUrl: args.ignoreHashInUrl,
      ignoreQueryParams: args.ignoreQueryParams,
      updatedAt: new Date(),
    },
  });

  return websiteScrapingInfo;
}
