import { QueryWebsiteScrapingInfosArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function articleIndexingInfos(_: any, args: QueryWebsiteScrapingInfosArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);
  const articleInfos = await prisma.articleIndexingInfo.findMany({
    where: {
      spaceId: args.spaceId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return articleInfos.map((a) => ({ ...a, textLength: a.text?.length, text: a.text?.slice(0, 100) }));
}
