import { MutationReFetchDiscordMessagesArgs } from '@/graphql/generated/graphql';
import { getDiscordClient } from '@/helpers/loaders/discord/discordClient';
import { storeDiscordMessagesForChannel } from '@/helpers/loaders/discord/discordMessages';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function reFetchDiscordMessages(_: any, args: MutationReFetchDiscordMessagesArgs, context: IncomingMessage) {
  if (!isDoDAOSuperAdmin(context)) {
    throw new Error('Not authorized');
  }
  const client = await getDiscordClient();
  const channel = await prisma.discordChannel.findFirst({ where: { shouldIndex: true, id: args.channelId } });
  if (!channel) throw new Error('Channel not found or should not be indexed');
  await storeDiscordMessagesForChannel(client, channel);
  return true;
}
