import { QueryChatbotUserQuestionsArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function chatbotUserQuestions(_: any, { spaceId }: QueryChatbotUserQuestionsArgs) {
  return prisma.chatbotUserQuestion.findMany({ where: { spaceId: spaceId } });
}
