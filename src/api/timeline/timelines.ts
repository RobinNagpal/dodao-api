import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis, getAllAcademyObjectsForSpace } from '@/helpers/academy/readers/academyObjectReader';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function timelines(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  return { status: 200, body: await getAllAcademyObjectsForSpace(spaceId, AcademyObjectTypes.timelines) };
}

export default apiResponseWrapper(timelines);
