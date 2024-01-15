import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { prisma } from '@/prisma';
import { Request, Response } from 'express-serve-static-core';

async function projectByte(req: Request, res: Response) {
  const projectId = req.params.projectId;
  const byteId = req.params.byteId;
  return { status: 200, body: await prisma.projectByte.findFirstOrThrow({ where: { projectId: projectId, id: byteId } }) };
}

export default apiResponseWrapper(projectByte);
