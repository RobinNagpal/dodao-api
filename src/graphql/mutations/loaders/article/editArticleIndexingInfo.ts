import { MutationEditArticleIndexingInfoArgs, MutationEditWebsiteScrapingInfoArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { indexArticleIndexingInfo } from '@/helpers/loaders/articleScraper/indexArticleIndexingInfo';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function editArticleIndexingInfo(_: any, args: MutationEditArticleIndexingInfoArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  const articleIndexingInfo = await prisma.articleIndexingInfo.update({
    where: {
      id: args.articleIndexingInfoId,
    },
    data: {
      articleUrl: args.articleUrl,
      updatedAt: new Date(),
      status: 'NEEDS_INDEXING',
    },
  });

  return await indexArticleIndexingInfo(articleIndexingInfo);
}
