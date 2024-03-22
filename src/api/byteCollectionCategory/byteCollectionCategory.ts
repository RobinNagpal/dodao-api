import { getByteCollectionCategoryWithByteCollections } from '@/graphql/queries/byteCollectionCategory/byteCollectionCategoryWithByteCollections';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function byteCollectionCategory(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  const categoryId = req.params.categoryId;
  return { status: 200, body: await getByteCollectionCategoryWithByteCollections(spaceId, categoryId) };
}

export default apiResponseWrapper(byteCollectionCategory);
