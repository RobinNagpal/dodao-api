import { MutationDeleteChatbotUserQuestionArgs } from '@/graphql/generated/graphql';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteChatbotUserQuestion(_: unknown, args: MutationDeleteChatbotUserQuestionArgs, context: IncomingMessage) {
  const token = isDoDAOSuperAdmin(context);
  if (!token) {
    throw new Error('Not authorized');
  }

  // Make sure its present
  prisma.chatbotUserQuestion.findFirstOrThrow({
    where: {
      id: args.id,
      spaceId: args.spaceId,
    },
  });

  await prisma.chatbotUserQuestion.delete({
    where: {
      id: args.id,
    },
  });

  return true;
}
