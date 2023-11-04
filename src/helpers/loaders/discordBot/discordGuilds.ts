import { prisma } from '@/prisma';
import { Client } from 'discord.js';
import { v4 } from 'uuid';

export async function mapAndStoreDiscordServers(client: Client) {
  const guilds = await client.guilds.fetch();

  for (const [guildId, oAuth2Guild] of guilds) {
    await prisma.discordServer.upsert({
      where: { discordServerId: guildId },
      update: {
        updatedAt: new Date(),
        name: oAuth2Guild.name,
      },
      create: {
        id: v4(),
        discordServerId: guildId,
        name: oAuth2Guild.name,
        iconUrl: oAuth2Guild.iconURL(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
