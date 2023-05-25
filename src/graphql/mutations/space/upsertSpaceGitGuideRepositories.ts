import { prisma } from '@/prisma';
import { MutationUpsertSpaceGitGuideRepositoriesArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { logError } from '@/helpers/adapters/errorLogger';
import { loadAllGuidesForSpace } from '@/helpers/gitGuides/gitGuideReader';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { IncomingMessage } from 'http';
import { uuid } from 'uuidv4';

export default async function upsertSpaceGitGuideRepositoriesMutation(_: unknown, args: MutationUpsertSpaceGitGuideRepositoriesArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(args.spaceId);

    const decodedJwt = checkEditSpacePermission(spaceById, context);

    const spaceIntegration = await prisma.spaceIntegration.upsert({
      where: {
        spaceId: spaceById.id,
      },
      create: {
        id: uuid(),
        spaceId: spaceById.id,
        createdBy: decodedJwt.accountId,
        gitGuideRepositories: args.gitGuideRepositories,
      },
      update: {
        gitGuideRepositories: args.gitGuideRepositories,
      },
    });
    await loadAllGuidesForSpace(args.spaceId, spaceIntegration);
    return spaceById;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertSpaceGitGuideRepositoriesMutation', {}, e as any, null, null);
    throw e;
  }
}
