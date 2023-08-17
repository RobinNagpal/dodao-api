import { MutationDeleteGitCourseSubmissionArgs } from '@/graphql/generated/graphql';
import { verifyJwtForRequest } from '@/helpers/permissions/verifyJwtForRequest';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteGitCourseSubmission(_: unknown, args: MutationDeleteGitCourseSubmissionArgs, context: IncomingMessage) {
  const { decodedJwt } = await verifyJwtForRequest(context, args.spaceId);

  await prisma.gitCourseTopicSubmission.deleteMany({
    where: {
      createdBy: decodedJwt.userId,
      courseKey: args.courseKey,
      spaceId: args.spaceId,
    },
  });

  await prisma.gitCourseSubmission.deleteMany({
    where: {
      createdBy: decodedJwt.userId,
      courseKey: args.courseKey,
      spaceId: args.spaceId,
    },
  });

  return true;
}
