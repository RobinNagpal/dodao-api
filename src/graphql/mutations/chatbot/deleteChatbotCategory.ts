import { MutationDeleteChatbotCategoryArgs } from '@/graphql/generated/graphql';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteChatbotCategory(_: unknown, args: MutationDeleteChatbotCategoryArgs, context: IncomingMessage) {
  const token = isDoDAOSuperAdmin(context);
  if (!token) {
    throw new Error('Not authorized');
  }

  // Make sure its present
  prisma.chatbotCategory.findFirstOrThrow({
    where: {
      id: args.id,
      spaceId: args.spaceId,
    },
  });

  await prisma.chatbotCategory.delete({
    where: {
      id: args.id,
    },
  });

  return true;
}
