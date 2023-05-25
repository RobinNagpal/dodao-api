import { MutationUpsertSpaceAcademyRepositoryArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { pullAcademyAndSetInRedis } from '@/helpers/academy/gitAcademyReader';
import { logError } from '@/helpers/adapters/errorLogger';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { uuid } from 'uuidv4';

export default async function upsertSpaceAcademyRepositoryMutation(_: unknown, args: MutationUpsertSpaceAcademyRepositoryArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(args.spaceId);

    const decodedJwt = checkEditSpacePermission(spaceById, context);

    await prisma.spaceIntegration.upsert({
      where: {
        spaceId: spaceById.id,
      },
      create: {
        id: uuid(),
        spaceId: spaceById.id,
        createdBy: decodedJwt.accountId,
        academyRepository: args.academyRepository,
      },
      update: {
        academyRepository: args.academyRepository,
      },
    });

    await pullAcademyAndSetInRedis(spaceById);

    return spaceById;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertSpaceGitGuideRepositoriesMutation', {}, e as any, null, null);
    throw e;
  }
}
