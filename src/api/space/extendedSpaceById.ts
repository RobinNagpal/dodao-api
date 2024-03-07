import { getSpaceIdForDomain } from '@/graphql/queries/space/getSpace';
import { getSpaceWithIntegrations } from '@/graphql/queries/space/getSpaceWithIntegrations';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function extendedSpaceById(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  if (!spaceId) return { status: 400, body: 'No spaceId passed in request' };
  const space = await getSpaceWithIntegrations(spaceId);
  if (!space) return { status: 400, body: 'No space found for spaceId ' + spaceId };
  return { status: 200, body: space };
}

export default apiResponseWrapper(extendedSpaceById);
