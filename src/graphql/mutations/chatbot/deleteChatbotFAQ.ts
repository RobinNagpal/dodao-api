import { MutationDeleteChatbotFaqArgs } from '@/graphql/generated/graphql';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { deleteDocWithUrlInPineconeByType } from '@/helpers/vectorIndexers/indexDocsInPinecone';
import { initPineconeClient } from '@/helpers/vectorIndexers/pineconeHelper';
import { prisma } from '@/prisma';
import { DocumentInfoType } from '@/types/chat/projectsContents';
import { IncomingMessage } from 'http';

export default async function deleteChatbotFAQ(_: unknown, args: MutationDeleteChatbotFaqArgs, context: IncomingMessage) {
  const token = isDoDAOSuperAdmin(context);
  if (!token) {
    throw new Error('Not authorized');
  }

  // Make sure its present
  const existingFaQ = await prisma.chatbotFAQ.findFirstOrThrow({
    where: {
      id: args.id,
      spaceId: args.spaceId,
    },
  });

  const index = await initPineconeClient();

  await deleteDocWithUrlInPineconeByType(existingFaQ.url, index, token.spaceId, DocumentInfoType.FAQ);

  await prisma.chatbotFAQ.delete({
    where: {
      id: args.id,
    },
  });

  return true;
}
