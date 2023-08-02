import { MutationDeleteGuideArgs } from '@/graphql/generated/graphql';
import { deleteGuideFromAcademyRepo } from '@/helpers/academy/writers/academyGuideWriter';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteGuide(parent: any, { spaceId, uuid }: MutationDeleteGuideArgs, context: IncomingMessage): Promise<boolean> {
  const spaceById = await prisma.space.findUniqueOrThrow({ where: { id: spaceId } });
  if (!spaceById) throw new Error(`No space found: ${spaceId}`);

  const decodedJwt = checkEditSpacePermission(spaceById, context);
  await deleteGuideFromAcademyRepo(spaceById, uuid);
  return true;
}
