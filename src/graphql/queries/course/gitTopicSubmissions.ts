import { QueryGitTopicSubmissionsArgs } from '@/graphql/generated/graphql';
import { getDecodedJwtFromContext } from '@/helpers/permissions/getDecodedJwtFromContext';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function gitTopicSubmissions(_: any, args: QueryGitTopicSubmissionsArgs, context: IncomingMessage) {
  const decodedJWT = getDecodedJwtFromContext(context);
  return prisma.gitCourseTopicSubmission.findMany({
    where: {
      spaceId: args.spaceId,
      courseKey: args.courseKey,
      createdBy: decodedJWT.accountId,
    },
  });
}
