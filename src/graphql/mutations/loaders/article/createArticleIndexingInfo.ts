import { MutationCreateArticleIndexingInfoArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { indexArticleIndexingInfo } from '@/helpers/loaders/articleScraper/indexArticleIndexingInfo';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export default async function createArticleIndexingInfo(_: any, args: MutationCreateArticleIndexingInfoArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  const articleIndexingInfo = await prisma.articleIndexingInfo.create({
    data: {
      id: v4(),
      spaceId: args.spaceId,
      articleUrl: args.articleUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'NEEDS_INDEXING',
    },
  });

  return await indexArticleIndexingInfo(articleIndexingInfo);
}
