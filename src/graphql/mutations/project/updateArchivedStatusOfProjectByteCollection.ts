import { MutationUpdateArchivedStatusOfProjectByteCollectionArgs } from '@/graphql/generated/graphql';
import { TOP_CRYPTO_PROJECTS_SPACE_ID } from '@/helpers/chat/utils/app/constants';
import { getProjectByteCollectionWithBytes } from '@/helpers/project/projectByteCollectionsHelper';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateArchivedStatusOfProjectByteCollection(
  parent: any,
  args: MutationUpdateArchivedStatusOfProjectByteCollectionArgs,
  context: IncomingMessage,
) {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: TOP_CRYPTO_PROJECTS_SPACE_ID } });

  const decodedJwt = checkEditSpacePermission(spaceById, context);

  const upsertedProjectByteCollection = await prisma.projectByteCollection.update({
    data: {
      archived: args.archived,
    },
    where: {
      id: args.byteCollectionId,
    },
  });

  return await getProjectByteCollectionWithBytes(upsertedProjectByteCollection);
}
