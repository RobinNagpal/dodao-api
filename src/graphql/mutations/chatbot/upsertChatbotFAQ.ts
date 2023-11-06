import { MutationUpsertChatbotFaqArgs } from '@/graphql/generated/graphql';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertChatbotFAQ(_: unknown, args: MutationUpsertChatbotFaqArgs, context: IncomingMessage) {
  const { space, decodedJwt } = await verifySpaceEditPermissions(context, args.spaceId);

  return prisma.chatbotFAQ.upsert({
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
      categories: args.input.categories || [],
      subCategories: args.input.subCategories || [],
    },
    update: {
      priority: args.input.priority,
      updatedAt: new Date(),
      question: args.input.question,
      answer: args.input.answer,
      categories: args.input.categories || [],
      subCategories: args.input.subCategories || [],
    },
  });
}
