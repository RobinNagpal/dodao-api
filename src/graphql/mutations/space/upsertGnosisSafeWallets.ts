import { MutationUpsertGnosisSafeWalletsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { logError } from '@/helpers/adapters/errorLogger';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { uuid } from 'uuidv4';

export default async function upsertGnosisSafeWalletsMutation(_: unknown, args: MutationUpsertGnosisSafeWalletsArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(args.spaceId);
    if (!spaceById) throw new Error(`No space found: ${args.spaceId}`);

    const decodedJwt = checkEditSpacePermission(spaceById, context);

    await prisma.spaceIntegration.upsert({
      where: {
        spaceId: spaceById.id,
      },
      create: {
        id: uuid(),
        spaceId: spaceById.id,
        createdBy: decodedJwt.accountId,
        gnosisSafeWallets: args.wallets,
      },
      update: {
        gnosisSafeWallets: args.wallets,
      },
    });

    return spaceById;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertGnosisSafeWalletsMutation', {}, e as any, null, null);
    throw e;
  }
}
