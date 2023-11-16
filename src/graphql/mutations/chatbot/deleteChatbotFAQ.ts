import { MutationDeleteChatbotFaqArgs } from '@/graphql/generated/graphql';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteChatbotFAQ(_: unknown, args: MutationDeleteChatbotFaqArgs, context: IncomingMessage) {
  const token = isDoDAOSuperAdmin(context);
  if (!token) {
    throw new Error('Not authorized');
  }

  // Make sure its present
  prisma.chatbotFAQ.findFirstOrThrow({
    where: {
      id: args.id,
      spaceId: args.spaceId,
    },
  });

  await prisma.chatbotFAQ.delete({
    where: {
      id: args.id,
    },
  });

  return true;
}
