import { MutationUpdateAuthSettingsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export async function updateAuthSettings(_: unknown, args: MutationUpdateAuthSettingsArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);

  checkEditSpacePermission(spaceById, context);

  return prisma.space.update({
    data: {
      authSettings: {
        enableLogin: args.input.enableLogin,
        loginOptions: args.input.loginOptions,
      },
    },
    where: {
      id: args.spaceId,
    },
  });
}
