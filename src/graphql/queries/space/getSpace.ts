import { QuerySpaceArgs } from '@/graphql/generated/graphql';
import { getSpaceWithIntegrations } from '@/graphql/queries/space/getSpaceWithIntegrations';
import { prisma } from '@/prisma';

async function getSpaceIdForDomain(domain: string) {
  const space = await prisma.space.findFirst({
    where: {
      domains: {
        has: domain,
      },
    },
  });
  if (space) {
    return space.id;
  }

  if (domain === 'dodao-ui-robinnagpal.vercel.app' || domain === 'localhost') {
    return 'test-academy-eth';
  }

  if (domain === 'uniswap-localhost.university') {
    return 'uniswap-eth-1';
  }

  if (domain === 'dodao-localhost.academy') {
    return 'dodao-academy-eth-1';
  }

  return 'test-academy-eth';
}

export default async function getSpace(_: any, { id, domain }: QuerySpaceArgs) {
  let spaceId = id;
  if (domain) {
    spaceId = await getSpaceIdForDomain(domain);
  }
  if (!spaceId) {
    throw new Error('No spaceId or domain provided');
  }
  return await getSpaceWithIntegrations(spaceId);
}
