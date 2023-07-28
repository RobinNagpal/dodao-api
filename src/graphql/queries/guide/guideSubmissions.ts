import { QueryGuideSubmissionsArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function guideSubmissions(_: any, args: QueryGuideSubmissionsArgs) {
  const { page, itemsPerPage, createdBy, createdAt, correctQuestionsCount } = args.filters || {};
  const submissions = await prisma.guideSubmission.findMany({
    skip: page * itemsPerPage,
    take: itemsPerPage,
    where: {
      guideUuid: args.guideUuid,
      spaceId: args.spaceId,
      createdBy: createdBy ? { contains: createdBy } : undefined,
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
  console.log('submissions', JSON.stringify(submissions));
  return submissions;
}
