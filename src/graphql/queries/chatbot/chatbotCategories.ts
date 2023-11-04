import { QueryChatbotCategoriesArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function chatbotCategories(_: any, { spaceId }: QueryChatbotCategoriesArgs) {
  return prisma.chatbotCategory.findMany({ where: { spaceId: spaceId } });
}
