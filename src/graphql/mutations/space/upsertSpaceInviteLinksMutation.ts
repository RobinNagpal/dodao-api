import { MutationUpsertSpaceInviteLinksArgs } from '@/graphql/generated/graphql';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { logError } from '@/helpers/adapters/errorLogger';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertSpaceInviteLinksMutation(_: unknown, args: MutationUpsertSpaceInviteLinksArgs, context: IncomingMessage) {
  try {
    const { space } = await verifySpaceEditPermissions(context, args.spaceId);

    return await prisma.space.update({
      where: {
        id: space.id,
      },
      data: {
        inviteLinks: args.spaceInviteArgs,
      },
    });
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertSpaceInviteLinksMutation', {}, e as any, null, null);
    throw e;
  }
}
