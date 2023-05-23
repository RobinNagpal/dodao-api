import { MutationUpsertProjectGalaxyAccessTokenArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { logError } from '@/helpers/adapters/errorLogger';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { uuid } from 'uuidv4';

export default async function upsertProjectGalaxyAccessToken(_: unknown, args: MutationUpsertProjectGalaxyAccessTokenArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(args.spaceId);
    if (!spaceById) throw new Error(`No space found: ${args.spaceId}`);

    const decodedJwt = checkEditSpacePermission(spaceById, context.headers?.authorization?.replace('Bearer ', '') || '');

    await prisma.spaceIntegration.upsert({
      where: {
        spaceId: spaceById.id,
      },
      create: {
        id: uuid(),
        spaceId: spaceById.id,
        createdBy: decodedJwt.accountId,
        projectGalaxyToken: args.accessToken,
        projectGalaxyTokenLastFour: args.accessToken.slice(-4),
      },
      update: {
        projectGalaxyToken: args.accessToken,
        projectGalaxyTokenLastFour: args.accessToken.slice(-4),
      },
    });

    return spaceById;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in upsertProjectGalaxyAccessToken', {}, e as any, null, null);
    throw e;
  }
}
