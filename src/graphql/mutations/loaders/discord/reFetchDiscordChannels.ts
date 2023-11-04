import { MutationReFetchDiscordChannelsArgs } from '@/graphql/generated/graphql';
import { mapAndStoreDiscordChannels } from '@/helpers/loaders/discordBot/discordChannels';
import { getDiscordClient } from '@/helpers/loaders/discordBot/discordClient';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function reFetchDiscordChannels(_: any, args: MutationReFetchDiscordChannelsArgs, context: IncomingMessage) {
  if (!isDoDAOSuperAdmin(context)) {
    throw new Error('Not authorized');
  }
  const client = await getDiscordClient();
  const discordServer = await prisma.discordServer.findFirstOrThrow({ where: { id: args.serverId } });
  await mapAndStoreDiscordChannels(client, discordServer);
  return prisma.discordChannel.findMany({ where: { serverId: args.serverId } });
}
