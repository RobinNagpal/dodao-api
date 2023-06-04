import { QuerySpaceArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

function getSpaceIdForDomain(domain: string) {
  if (domain === 'dodao-ui-robinnagpal.vercel.app' || domain === 'localhost') {
    return 'test-academy-eth';
  }

  return 'test-academy-eth';
}

export default async function getSpace(_: any, { id, domain }: QuerySpaceArgs) {
  let spaceId = id;
  if (domain) {
    spaceId = getSpaceIdForDomain(domain);
  }
  if (!spaceId) {
    throw new Error('No spaceId or domain provided');
  }
  const space = await prisma.space.findUnique({ where: { id: spaceId } });

  const spaceIntegrations = await prisma.spaceIntegration.findUnique({ where: { spaceId } });
  return { ...space, spaceIntegrations };
}
