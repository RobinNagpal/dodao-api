import { MutationReFetchDiscordMessagesArgs } from '@/graphql/generated/graphql';
import { getDiscordClient } from '@/helpers/loaders/discordBot/discordClient';
import { storeDiscordMessagesForChannel } from '@/helpers/loaders/discordBot/discordMessages';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function reFetchDiscordMessages(_: any, args: MutationReFetchDiscordMessagesArgs, context: IncomingMessage) {
  if (!isDoDAOSuperAdmin(context)) {
    throw new Error('Not authorized');
  }
  const client = await getDiscordClient();
  const channel = await prisma.discordChannel.findFirstOrThrow({ where: { shouldIndex: true, id: args.channelId } });
  await storeDiscordMessagesForChannel(client, channel);
  return true;
}
