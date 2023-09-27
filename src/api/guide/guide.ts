import { getAcademyGuideFromRedis } from '@/helpers/academy/readers/academyGuideReader';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function guide(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  const uuid = req.params.guideId;
  return { status: 200, body: await getAcademyGuideFromRedis(spaceId, uuid) };
}

export default apiResponseWrapper(guide);
