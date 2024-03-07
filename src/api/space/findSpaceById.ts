import { getSpaceWithIntegrations } from '@/graphql/queries/space/getSpaceWithIntegrations';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function findSpaceById(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  if (!spaceId) return { status: 400, body: 'No spaceId passed in request' };
  const space = await getSpaceWithIntegrations(spaceId);
  return { status: 200, body: space };
}

export default apiResponseWrapper(findSpaceById);
