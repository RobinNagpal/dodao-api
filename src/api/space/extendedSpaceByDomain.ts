import { getSpaceIdForDomain } from '@/graphql/queries/space/getSpace';
import { getSpaceWithIntegrations } from '@/graphql/queries/space/getSpaceWithIntegrations';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function extendedSpaceByDomain(req: Request, res: Response) {
  const domain = req.query.domain;
  if (!domain) return { status: 400, body: 'No domain provided' };
  const spaceId = await getSpaceIdForDomain(domain as string);
  if (!spaceId) return { status: 400, body: 'No space found for domain' };

  return { status: 200, body: await getSpaceWithIntegrations(spaceId) };
}

export default apiResponseWrapper(extendedSpaceByDomain);
