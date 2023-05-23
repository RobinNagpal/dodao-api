import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { prisma } from '@/prisma';
import { MutationInitializeGitCourseSubmissionArgs } from '@/graphql/generated/graphql';
import { verifyJwtForRequest } from '@/graphql/mutations/helper/verifyJwtForRequest';
import { getGitCourseFromRedis } from '@/helpers/course/gitCourseReader';
import { IncomingMessage } from 'http';
import { uuid } from 'uuidv4';

export default async function initializeGitCourseSubmissionMutation(_: unknown, args: MutationInitializeGitCourseSubmissionArgs, context: IncomingMessage) {
  try {
    const spaceId = args.spaceId;
    const courseKey = args.courseKey;

    const { space, decodedJwt } = await verifyJwtForRequest(context, args.spaceId);

    const courseJson: GitCourseModel | undefined = await getGitCourseFromRedis(space.id, courseKey);

    if (!courseJson) {
      throw new Error(`No course found: ${spaceId} - ${courseKey}`);
    }

    const existingCourseSubmission = await prisma.gitCourseSubmission.findFirst({
      where: {
        spaceId: spaceId,
        courseKey: courseKey,
        createdBy: decodedJwt.userId,
      },
    });

    if (existingCourseSubmission) {
      throw new Error(`There is already an existing course submission: ${spaceId} - ${courseKey} - ${decodedJwt.accountId}`);
    }

    const topicSubmissions = await prisma.gitCourseTopicSubmission.findMany({
      where: {
        spaceId: spaceId,
        courseKey: courseKey,
        createdBy: decodedJwt.userId,
      },
    });

    if (topicSubmissions.length) {
      throw new Error(
        `There are already existing course topic submissions: ${spaceId} - ${courseKey} - ${decodedJwt.accountId} - ${JSON.stringify(
          topicSubmissions.map((ts) => ({ uuid: ts.uuid, topicKey: ts.topicKey }))
        )}`
      );
    }

    const courseSubmissionModel = await prisma.gitCourseSubmission.create({
      data: {
        uuid: uuid().toString(),
        spaceId: spaceId,
        courseKey: courseKey,
        createdBy: decodedJwt.userId,
        status: 'Initialized',
        isLatestSubmission: true,
      },
    });

    return { ...courseSubmissionModel, topicSubmissions: [] };
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
