import { getDiscordClient } from '@/helpers/loaders/discord/discordClient';
import { mapAndStoreDiscordServers } from '@/helpers/loaders/discord/discordGuilds';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function reFetchDiscordServers(_: any, __: any, context: IncomingMessage) {
  if (!isDoDAOSuperAdmin(context)) {
    throw new Error('Not authorized');
  }
  const client = await getDiscordClient();
  await mapAndStoreDiscordServers(client);
  return prisma.discordServer.findMany();
}
