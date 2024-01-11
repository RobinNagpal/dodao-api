import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { prisma } from '@/prisma';
import { Request, Response } from 'express-serve-static-core';

async function projects(req: Request, res: Response) {
  return { status: 200, body: await prisma.project.findMany() };
}

export default apiResponseWrapper(projects);
