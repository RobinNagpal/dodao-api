import { MutationUpsertChatbotUserQuestionArgs } from '@/graphql/generated/graphql';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertChatbotUserQuestion(_: unknown, args: MutationUpsertChatbotUserQuestionArgs, context: IncomingMessage) {
  const { space, decodedJwt } = await verifySpaceEditPermissions(context, args.spaceId);

  return prisma.chatbotUserQuestion.upsert({
    where: {
      id: args.input.id,
    },
    create: {
      id: args.input.id,
      spaceId: space.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      question: args.input.question,
    },
    update: {
      updatedAt: new Date(),
      question: args.input.question,
    },
  });
}
