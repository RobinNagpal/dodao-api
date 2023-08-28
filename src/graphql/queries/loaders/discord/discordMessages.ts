import { QueryDiscordMessagesArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function discordMessages(_: any, args: QueryDiscordMessagesArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  return prisma.discordMessage.findMany({
    where: {
      channelId: args.channelId,
    },
  });
}
