import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { prisma } from '@/prisma';
import { Request, Response } from 'express-serve-static-core';

async function projectByteCollections(req: Request, res: Response) {
  const projectId = req.params.projectId;
  return { status: 200, body: await prisma.projectByteCollection.findMany({ where: { projectId: projectId } }) };
}

export default apiResponseWrapper(projectByteCollections);
