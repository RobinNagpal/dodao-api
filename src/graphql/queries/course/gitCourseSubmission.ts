import { QueryGitCourseSubmissionArgs } from '@/graphql/generated/graphql';
import { getDecodedJwtFromContext, getJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function gitCourseSubmission(_: any, { spaceId, courseKey }: QueryGitCourseSubmissionArgs, context: IncomingMessage) {
  try {
    const jwtString = getJwtFromContext(context);
    if (!jwtString) {
      return;
    }

    const decodedJWT = getDecodedJwtFromContext(context);

    const courseSubmission = await prisma.gitCourseSubmission.findFirst({ where: { spaceId, courseKey, createdBy: decodedJWT.accountId } });
    const topicSubmissions = await prisma.gitCourseTopicSubmission.findMany({ where: { spaceId, courseKey, createdBy: decodedJWT.accountId } });

    if (courseSubmission) {
      return {
        ...courseSubmission,
        topicSubmissions: topicSubmissions,
      };
    }
  } catch (e) {
    console.log('[graphql]', e);
    return Promise.reject(
      `request failed - gitCourseSubmission - ${JSON.stringify({
        spaceId,
        courseKey,
        error: e?.toString(),
        jwt: getJwtFromContext(context),
      })} `,
    );
  }
}
