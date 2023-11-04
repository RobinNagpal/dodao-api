import { prisma } from '@/prisma';
import { DiscordServer } from '@prisma/client';
import { Client, TextChannel } from 'discord.js';
import { v4 } from 'uuid';

export enum DiscordChannelStatus {
  NEEDS_INDEXING = 'NEEDS_INDEXING',
  INDEXING_SUCCESS = 'INDEXING_SUCCESS',
  INDEXING_FAILED = 'INDEXING_FAILED',
}

export async function mapAndStoreDiscordChannels(client: Client, server: DiscordServer) {
  const discordServer = await client.guilds.cache.get(server.discordServerId);
  if (!discordServer) throw new Error('Discord server not found');

  const channels = await discordServer?.channels.guild.channels?.fetch();
  for (const [channelId, channel] of channels) {
    const discordChannel = client.channels.cache.get(channelId);
    if (!discordChannel) throw new Error('Discord channel not found');
    const channel = discordChannel as TextChannel;
    if (channel.type === 0) {
      console.log('channel', { type: channel.type, name: channel.name, channelId: channelId });
      await prisma.discordChannel.upsert({
        where: { discordChannelId: channelId },
        update: {
          updatedAt: new Date(),
          name: channel.name,
        },
        create: {
          id: v4(),
          discordChannelId: channel.id,
          name: channel.name,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: DiscordChannelStatus.NEEDS_INDEXING,
          shouldIndex: false,
          serverId: server.id,
          type: channel.type.toString(),
        },
      });
    }
  }
}
