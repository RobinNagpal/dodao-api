import { MutationRefreshGitGuidesArgs } from '@/graphql/generated/graphql';
import { verifySpaceEditPermissions } from '@/graphql/mutations/helper/verifySpaceEditPermissions';
import { loadAllGuidesForSpace } from '@/helpers/gitGuides/gitGuideReader';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function refreshGitGuides(_: unknown, args: MutationRefreshGitGuidesArgs, context: IncomingMessage) {
  try {
    const { space } = await verifySpaceEditPermissions(context, args.spaceId);

    const spaceIntegration = await prisma.spaceIntegration.findUniqueOrThrow({
      where: {
        spaceId: space.id,
      },
    });

    await loadAllGuidesForSpace(space.id, spaceIntegration);
    return true;
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
