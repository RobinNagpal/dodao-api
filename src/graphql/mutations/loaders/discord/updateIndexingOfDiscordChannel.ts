import { MutationUpdateIndexingOfDiscordChannelArgs } from '@/graphql/generated/graphql';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateIndexingOfDiscordChannel(_: any, args: MutationUpdateIndexingOfDiscordChannelArgs, context: IncomingMessage) {
  if (!isDoDAOSuperAdmin(context)) {
    throw new Error('Not authorized');
  }

  return prisma.discordChannel.update({
    where: { id: args.channelId },
    data: {
      shouldIndex: args.shouldIndex,
    },
  });
}
