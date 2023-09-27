import { getSpaceById } from '@/graphql/operations/space';
import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { getAllGitGitCoursesForSpace } from '@/helpers/course/gitCourseReader';
import { Request, Response } from 'express-serve-static-core';

async function courses(req: Request, res: Response) {
  const spaceId = req.params.spaceId;

  const space = await getSpaceById(spaceId);

  return { status: 200, body: await getAllGitGitCoursesForSpace(space) };
}

export default apiResponseWrapper(courses);
