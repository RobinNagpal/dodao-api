import { MutationUpsertChatbotCategoryArgs } from '@/graphql/generated/graphql';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertChatbotCategory(_: unknown, args: MutationUpsertChatbotCategoryArgs, context: IncomingMessage) {
  const { space, decodedJwt } = await verifySpaceEditPermissions(context, args.spaceId);

  return prisma.chatbotCategory.upsert({
    where: {
      id: args.input.id,
    },
    create: {
      id: args.input.id,
      key: args.input.key,
      name: args.input.name,
      description: args.input.description,
      priority: args.input.priority,
      spaceId: space.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      subCategories: args.input.subCategories,
    },
    update: {
      key: args.input.key,
      name: args.input.name,
      description: args.input.description,
      priority: args.input.priority,
      updatedAt: new Date(),
      subCategories: args.input.subCategories,
    },
  });
}
