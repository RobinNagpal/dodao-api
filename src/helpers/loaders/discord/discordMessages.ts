import client from '@/helpers/loaders/discord/client';
import { prisma } from '@/prisma';
import { DiscordChannel } from '@prisma/client';
import { TextChannel } from 'discord.js';
import { v4 } from 'uuid';

export async function storeDiscordMessagesForChannel(channel: DiscordChannel) {
  const discordChannel = client.channels.cache.get(channel.discordChannelId) as TextChannel;
  if (!discordChannel) throw new Error('Discord channel not found');

  if (discordChannel.type === 0) {
    const messages = await discordChannel?.messages.fetch();

    console.log(messages);

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
        },
      });
    }
  }
}
