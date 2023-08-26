// import { TextChannel } from 'discord.js';
import { mapAndStoreDiscordChannels } from '@/helpers/loaders/discord/discordChannels';
import { mapAndStoreDiscordServers } from '@/helpers/loaders/discord/discordGuilds';
import { storeDiscordMessagesForChannel } from '@/helpers/loaders/discord/discordMessages';
import { prisma } from '@/prisma';
import client from './client';

client.on('ready', async () => {
  console.log(`Logged in as ${client.user?.tag}`);

  storeDiscordMessages();
});

async function storeDiscordMessages() {
  await mapAndStoreDiscordServers();

  const servers = await prisma.discordServer.findMany();
  for (const server of servers) {
    await mapAndStoreDiscordChannels(server);
  }

  const channels = await prisma.discordChannel.findMany();

  for (const channel of channels) {
    const channelId = channel.discordChannelId;
    await storeDiscordMessagesForChannel(channel);
  }
}
