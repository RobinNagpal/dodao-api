import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';
import { prisma } from '@/prisma';
import { Request, Response } from 'express-serve-static-core';

async function shortVideo(req: Request, res: Response) {
  const spaceId = req.params.spaceId;
  const videoId = req.params.videoId;
  return {
    status: 200,
    body: await prisma.shortVideo.findFirstOrThrow({
      where: {
        spaceId: spaceId,
        id: videoId,
      },
    }),
  };
}

export default apiResponseWrapper(shortVideo);
