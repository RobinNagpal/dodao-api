import { prisma } from '@/prisma';
import { DiscordChannel } from '@prisma/client';
import { Client, TextChannel } from 'discord.js';
import { v4 } from 'uuid';

export async function storeDiscordMessagesForChannel(client: Client, channel: DiscordChannel) {
  const discordChannel = client.channels.cache.get(channel.discordChannelId) as TextChannel;
  if (!discordChannel) throw new Error('Discord channel not found');

  if (discordChannel.type === 0) {
    const messages = await discordChannel?.messages.fetch();

    try {
      for (const [messageId, message] of messages) {
        console.log('messages', { mm: message.content });
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
    } catch (error) {
      console.log(error);
    }
  }
}
