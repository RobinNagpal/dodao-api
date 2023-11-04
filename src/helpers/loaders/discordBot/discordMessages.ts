import { prisma } from '@/prisma';
import { DiscordChannel } from '@prisma/client';
import { Client, Collection, Message, TextChannel, ChannelType } from 'discord.js';
import { v4 } from 'uuid';

export async function storeDiscordMessagesForChannel(client: Client, channel: DiscordChannel) {
  const discordChannel = (await client.channels.fetch(channel.discordChannelId)) as TextChannel;
  if (!discordChannel) throw new Error('Discord channel not found');

  if (discordChannel.type === 0) {
    const messages: Collection<string, Message> = await discordChannel?.messages.fetch();

    try {
      for (const [messageId, message] of messages) {
        if (message.hasThread && message.thread?.type === ChannelType.PublicThread) {
          const threadMessages = await message.thread?.messages.fetch();
          for (const [threadMessageId, threadMessage] of threadMessages) {
            await prisma.discordMessage.upsert({
              where: { discordMessageId: threadMessageId },
              update: {
                updatedAt: new Date(),
                content: threadMessage.content,
              },
              create: {
                id: v4(),
                discordMessageId: threadMessageId,
                channelId: channel.id,
                serverId: channel.serverId,
                content: threadMessage.content,
                createdAt: new Date(),
                messageDate: threadMessage.createdAt,
                updatedAt: new Date(),
                authorUsername: threadMessage.author.username,
              },
            });
          }
        } else {
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
              messageDate: message.createdAt,
              updatedAt: new Date(),
              authorUsername: message.author.username,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
