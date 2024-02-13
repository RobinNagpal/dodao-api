import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { prisma } from '@/prisma';
import { Request, Response } from 'express-serve-static-core';

async function shortVideos(req: Request, res: Response) {
  const spaceId = req.params.spaceId;

  return {
    status: 200,
    body: await prisma.shortVideo.findMany({
      where: {
        spaceId: spaceId,
      },
    }),
  };
}

export default apiResponseWrapper(shortVideos);
