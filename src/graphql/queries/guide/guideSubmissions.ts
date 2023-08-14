import { QueryGuideSubmissionsArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function guideSubmissions(_: any, args: QueryGuideSubmissionsArgs) {
  const { page, itemsPerPage, createdByUsername, createdAt, correctQuestionsCount } = args.filters || {};
  const submissions = await prisma.guideSubmission.findMany({
    skip: page * itemsPerPage,
    take: itemsPerPage && itemsPerPage < 200 ? itemsPerPage : 200,
    where: {
      guideUuid: args.guideUuid,
      spaceId: args.spaceId,
      createdByUsername: createdByUsername ? { contains: createdByUsername } : undefined,
      createdAt: createdAt
        ? {
            gte: createdAt.after ? createdAt.after : undefined,
            lte: createdAt.before ? createdAt.before : undefined,
          }
        : undefined,
      correctQuestionsCount: correctQuestionsCount ? { gte: correctQuestionsCount } : undefined,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return submissions;
}
