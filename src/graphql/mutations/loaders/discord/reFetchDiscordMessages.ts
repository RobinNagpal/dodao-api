import { MutationReFetchDiscordMessagesArgs } from '@/graphql/generated/graphql';
import { getDiscordClient } from '@/helpers/loaders/discord/discordClient';
import { storeDiscordMessagesForChannel } from '@/helpers/loaders/discord/discordMessages';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { DiscordChannel } from '@prisma/client';
import { Client } from 'discord.js';
import { IncomingMessage } from 'http';

async function indexAllMessages(channels: DiscordChannel[], client: Client) {
  for (const channel of channels) {
    await storeDiscordMessagesForChannel(client, channel);
  }
}

export default async function reFetchDiscordMessages(_: any, args: MutationReFetchDiscordMessagesArgs, context: IncomingMessage) {
  if (!isDoDAOSuperAdmin(context)) {
    throw new Error('Not authorized');
  }
  const client = await getDiscordClient();
  const channels = await prisma.discordChannel.findMany({ where: { serverId: args.serverId, shouldIndex: true } });
  indexAllMessages(channels, client);
  return true;
}
