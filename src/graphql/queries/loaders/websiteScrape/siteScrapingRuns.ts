import { QuerySiteScrapingRunsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function siteScrapingRuns(_: any, args: QuerySiteScrapingRunsArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);
  return prisma.siteScrapingRun.findMany({
    where: {
      spaceId: args.spaceId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
