import { QueryProjectShortVideosArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default function projectShortVideos(_: any, { projectId }: QueryProjectShortVideosArgs) {
  return prisma.projectShortVideo.findMany({ where: { projectId: projectId } });
}
