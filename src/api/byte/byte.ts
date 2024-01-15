import { getByte } from '@/graphql/queries/byte/byte';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function byte(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  const byteId = req.params.byteId;
  const includeDraft = req.query.includeDraft;
  return { status: 200, body: await getByte(spaceId, byteId, !!includeDraft) };
}

export default apiResponseWrapper(byte);
