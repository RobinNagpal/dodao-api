import { indexAllPosts } from '@/helpers/loaders/discourse/discoursePostSummary';
import { prisma } from '@/prisma';
import { v4 } from 'uuid';

export enum DiscourseIndexRunStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export default async function startDiscourseIndexRun(discourseUrl: string): Promise<void> {
  const previousRun = await prisma.discourseIndexRun.findFirst({
    where: {
      url: discourseUrl,
    },
    orderBy: {
      runDate: 'desc',
    },
  });

  const indexRun = await prisma.discourseIndexRun.create({
    data: {
      id: v4(),
      status: DiscourseIndexRunStatus.IN_PROGRESS,
      runDate: new Date(),
      url: discourseUrl,
      spaceId: 'dodao',
    },
  });

  await indexAllPosts(discourseUrl, previousRun?.runDate || new Date(0));
}
