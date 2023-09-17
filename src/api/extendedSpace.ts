import { getSpaceIdForDomain } from '@/graphql/queries/space/getSpace';
import { getSpaceWithIntegrations } from '@/graphql/queries/space/getSpaceWithIntegrations';
import { Request, Response } from 'express-serve-static-core';

export default async function extendedSpace(req: Request, res: Response) {
  const domain = req.query.domain;
  if (!domain) return res.status(400).send('No domain provided');
  const spaceId = await getSpaceIdForDomain(domain as string);
  if (!spaceId) return res.status(400).send('No space found for domain');

  return res.status(200).send(await getSpaceWithIntegrations(spaceId));
}
