import { QueryClickableDemosArgs, ClickableDemo } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export async function getClickableDemos(spaceId: string): Promise<ClickableDemo[]> {
  const clickableDemos = await prisma.clickableDemos.findMany({
    where: {
      spaceId: spaceId,
    },
    select: {
      id: true,
      title: true,
      excerpt: true,
      spaceId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return clickableDemos;
}
export default async function clickableDemos(_: any, args: QueryClickableDemosArgs) {
  return getClickableDemos(args.spaceId);
}
