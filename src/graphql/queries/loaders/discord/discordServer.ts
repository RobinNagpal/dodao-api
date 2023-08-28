import { QueryDiscordServerArgs, QueryDiscourseIndexRunsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function discordServer(_: any, args: QueryDiscordServerArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  return prisma.discordServer.findFirstOrThrow({
    where: {
      id: args.id,
    },
  });
}

