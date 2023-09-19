import { QuerySpaceArgs } from '@/graphql/generated/graphql';
import { getSpaceWithIntegrations } from '@/graphql/queries/space/getSpaceWithIntegrations';
import { prisma } from '@/prisma';

export async function getSpaceIdForDomain(domain: string) {
  const space = await prisma.space.findFirst({
    where: {
      OR: [
        {
          domains: {
            has: domain,
          },
        },
        {
          botDomains: {
            has: domain,
          },
        },
      ],
    },
  });
  if (space) {
    return space.id;
  }

  if (domain === 'dodao-ui-robinnagpal.vercel.app' || domain === 'localhost') {
    return 'test-academy-eth';
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
