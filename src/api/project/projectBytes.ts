import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { prisma } from '@/prisma';
import { Request, Response } from 'express-serve-static-core';

async function projectBytes(req: Request, res: Response) {
  const projectId = req.params.projectId;
  return { status: 200, body: await prisma.projectByte.findMany({ where: { projectId: projectId } }) };
}

export default apiResponseWrapper(projectBytes);
