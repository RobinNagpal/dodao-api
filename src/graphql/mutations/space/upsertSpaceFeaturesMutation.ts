import { MutationUpsertSpaceFeaturesArgs } from '@/graphql/generated/graphql';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { getSpaceById } from '@/graphql/operations/space';
import { logError } from '@/helpers/adapters/errorLogger';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertSpaceFeaturesMutation(_: unknown, args: MutationUpsertSpaceFeaturesArgs, context: IncomingMessage) {
  try {
    const { space } = await verifySpaceEditPermissions(context, args.spaceId);

    return await prisma.space.update({
      where: {
        id: space.id,
      },
      data: {
        features: args.features,
      },
    });
    return await getSpaceById(space.id);
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertSpaceFeaturesMutation', {}, e as any, null, null);
    throw e;
  }
}
