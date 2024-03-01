import { ArticleIndexingInfo, QueryArticleIndexingInfoArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function articleIndexingInfo(_: any, args: QueryArticleIndexingInfoArgs, context: IncomingMessage): Promise<ArticleIndexingInfo> {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);
  const a = await prisma.articleIndexingInfo.findUniqueOrThrow({
    where: {
      id: args.articleIndexingInfoId,
    },
  });
  return { ...a, textLength: a.text?.length, textSample: a.text?.slice(0, 100), text: a.text };
}
