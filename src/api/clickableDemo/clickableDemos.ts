import { getClickableDemos } from '@/graphql/queries/clickableDemos/clickableDemos';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function clickableDemos(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  return { status: 200, body: await getClickableDemos(spaceId) };
}

export default apiResponseWrapper(clickableDemos);
