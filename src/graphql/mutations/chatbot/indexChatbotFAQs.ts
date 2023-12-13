import { MutationIndexChatbotFaQsArgs } from '@/graphql/generated/graphql';
import { indexFAQInPinecone } from '@/helpers/vectorIndexers/faq/indexFAQInPinecone';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';

async function indexAllFaqs(space: Space) {
  const faqs = await prisma.chatbotFAQ.findMany({
    where: {
      spaceId: space.id,
    },
  });

  for (const faq of faqs) {
    await indexFAQInPinecone(space.id, await faq);
  }
}

export default async function indexChatbotFAQs(_: unknown, args: MutationIndexChatbotFaQsArgs, context: IncomingMessage) {
  const { space, decodedJwt } = await verifySpaceEditPermissions(context, args.spaceId);
  await indexAllFaqs(space);

  return true;
}
