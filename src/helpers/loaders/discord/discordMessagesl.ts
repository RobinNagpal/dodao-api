import client from '@/helpers/loaders/discord/client';
import { prisma } from '@/prisma';
import { DiscordChannel } from '@prisma/client';
import { TextChannel } from 'discord.js';
import { v4 } from 'uuid';

export async function storeDiscordMessagesForChannel(channel: DiscordChannel) {
  const discordChannel = await client.channels.cache.get(channel.discordChannelId);
  if (!discordChannel) throw new Error('Discord channel not found');
  const textChannel = discordChannel as TextChannel;

  const messages = await textChannel.messages.fetch({});
  for (const [messageId, message] of messages) {
    await prisma.discordMessage.upsert({
      where: { discordMessageId: messageId },
      update: {
        updatedAt: new Date(),
        content: message.content,
      },
      create: {
        id: v4(),
        discordMessageId: messageId,
        channelId: channel.id,
        serverId: channel.serverId,
        content: message.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        spaceId: 'dodao',
      },
    });
  }
}
