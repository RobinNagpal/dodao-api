import { QuerySpaceArgs } from '@/graphql/generated/graphql';
import { getSpaceWithIntegrations } from '@/graphql/queries/space/getSpaceWithIntegrations';

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
  return await getSpaceWithIntegrations(spaceId);
}
