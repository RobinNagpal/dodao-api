import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { getProjectBytesCollectionWithBytes } from '@/helpers/project/projectByteCollectionsHelper';
import { Request, Response } from 'express-serve-static-core';

async function projectByteCollections(req: Request, res: Response) {
  const projectId = req.params.projectId;

  return { status: 200, body: await getProjectBytesCollectionWithBytes(projectId) };
}

export default apiResponseWrapper(projectByteCollections);
