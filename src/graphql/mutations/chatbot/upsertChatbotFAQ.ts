import { MutationUpsertChatbotFaqArgs } from '@/graphql/generated/graphql';
import { indexFAQInPinecone } from '@/helpers/loaders/faq/indexFAQInPinecone';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertChatbotFAQ(_: unknown, args: MutationUpsertChatbotFaqArgs, context: IncomingMessage) {
  const { space, decodedJwt } = await verifySpaceEditPermissions(context, args.spaceId);

  const upsertedFAQ = prisma.chatbotFAQ.upsert({
    where: {
      id: args.input.id,
    },
    create: {
      id: args.input.id,
      priority: args.input.priority,
      spaceId: space.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      question: args.input.question,
      answer: args.input.answer,
      url: args.input.url,
      categories: args.input.categories || [],
      subCategories: args.input.subCategories || [],
    },
    update: {
      priority: args.input.priority,
      updatedAt: new Date(),
      question: args.input.question,
      answer: args.input.answer,
      url: args.input.url,
      categories: args.input.categories || [],
      subCategories: args.input.subCategories || [],
    },
  });

  await indexFAQInPinecone(space.id, await upsertedFAQ);
  return upsertedFAQ;
}
