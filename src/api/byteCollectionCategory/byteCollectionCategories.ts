import { getByteCollectionCategories } from '@/graphql/queries/byteCollectionCategory/byteCollectionCategories';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function byteCollectionCategories(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  return { status: 200, body: await getByteCollectionCategories(spaceId) };
}

export default apiResponseWrapper(byteCollectionCategories);
