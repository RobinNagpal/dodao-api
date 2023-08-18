import client from '@/helpers/loaders/discord/client';
import { prisma } from '@/prisma';
import { DiscordServer } from '@prisma/client';
import { TextChannel } from 'discord.js';
import { v4 } from 'uuid';

export async function mapAndStoreDiscordChannels(server: DiscordServer) {
  const discordServer = await client.guilds.cache.get(server.discordServerId);
  if (!discordServer) throw new Error('Discord server not found');

  const channels = await discordServer?.channels.guild.channels?.fetch();
  for (const [channelId, channel] of channels) {
    const discordChannel = client.channels.cache.get(channelId);
    if (!discordChannel) throw new Error('Discord channel not found');
    const channel = discordChannel as TextChannel;

    await prisma.discordChannel.upsert({
      where: { discordChannelId: channelId },
      update: {
        updatedAt: new Date(),
        name: channel.name,
        status: 'IN_PROGRESS',
      },
      create: {
        id: v4(),
        discordChannelId: channelId,
        name: channel.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        spaceId: 'dodao',
        status: 'IN_PROGRESS',
        serverId: server.id,
        type: channel.type.toString(),
      },
    });
  }
}
