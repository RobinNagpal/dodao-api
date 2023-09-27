import { getAllAcademyGuidesForSpace } from '@/helpers/academy/readers/academyGuideReader';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { Request, Response } from 'express-serve-static-core';

async function guides(req: Request, res: Response) {
  const spaceId = req.params.spaceId;

  return { status: 200, body: await getAllAcademyGuidesForSpace(spaceId) };
}

export default apiResponseWrapper(guides);
