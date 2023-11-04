import { QueryChatbotFaQsArgs, QueryChatbotUserQuestionsArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function chatbotFAQs(_: any, { spaceId }: QueryChatbotFaQsArgs) {
  return prisma.chatbotFAQ.findMany({ where: { spaceId: spaceId } });
}
