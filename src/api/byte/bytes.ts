import { getBytes } from '@/graphql/queries/byte/bytes';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function courses(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  return { status: 200, body: await getBytes(spaceId) };
}

export default apiResponseWrapper(courses);
