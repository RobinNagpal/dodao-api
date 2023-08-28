import { QueryDiscordChannelsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function discordChannels(_: any, args: QueryDiscordChannelsArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  return prisma.discordChannel.findMany({
    where: {
      serverId: args.serverId,
    },
  });
}
