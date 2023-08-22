import { MutationUpsertSpaceLoaderInfoArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export default async function upsertSpaceLoaderInfo(_: unknown, args: MutationUpsertSpaceLoaderInfoArgs, context: IncomingMessage) {
  const { space } = await verifySpaceEditPermissions(context, args.spaceId);

  await prisma.spaceIntegration.upsert({
    where: {
      spaceId: space.id,
    },
    create: {
      id: v4(),
      spaceId: space.id,
      loadersInfo: args.input,
    },
    update: {
      loadersInfo: args.input,
    },
  });

  return await getSpaceById(space.id);
}
