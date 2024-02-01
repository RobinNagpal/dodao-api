import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function timeline(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  const uuid = req.params.timelineKey;
  return { status: 200, body: await getAcademyObjectFromRedis(spaceId, AcademyObjectTypes.timelines, uuid) };
}

export default apiResponseWrapper(timeline);
