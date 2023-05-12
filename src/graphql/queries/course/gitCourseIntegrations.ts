import { QueryGitCourseIntegrationsArgs } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export default async function gitCourseIntegrations(_: any, { spaceId, key }: QueryGitCourseIntegrationsArgs) {
  return prisma.courseIntegration.findFirst({ where: { spaceId: spaceId, courseKey: key } });
}
