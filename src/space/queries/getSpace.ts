import { QuerySpaceArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

function getSpaceIdForDomain(domain: string) {
  if (domain === 'dodao-ui-robinnagpal.vercel.app' || domain === 'localhost') {
    return 'uniswap-eth-1';
  }
}

export default async function getSpace(_: any, { id, domain }: QuerySpaceArgs) {
  let spaceId = id;
  if (domain) {
    spaceId = getSpaceIdForDomain(domain);
  }
  if (!spaceId) {
    throw new Error('No spaceId or domain provided');
  }
  return prisma.space.findUnique({ where: { id: spaceId } });
}
