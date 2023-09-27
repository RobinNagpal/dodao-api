import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { getGitCourseFromRedis } from '@/helpers/course/gitCourseReader';
import { Request, Response } from 'express-serve-static-core';

async function course(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  const courseKey = req.params.courseKey;
  return { status: 200, body: getGitCourseFromRedis(spaceId, courseKey) };
}

export default apiResponseWrapper(course);
