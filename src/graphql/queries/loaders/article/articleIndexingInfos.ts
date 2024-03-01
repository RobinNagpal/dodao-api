import { ArticleIndexingInfo, QueryArticleIndexingInfosArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function articleIndexingInfos(_: any, args: QueryArticleIndexingInfosArgs, context: IncomingMessage): Promise<ArticleIndexingInfo[]> {
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
  return articleInfos.map((a) => ({ ...a, textLength: a.text?.length, textSample: a.text?.slice(0, 100), text: a.text }));
}
