import { MutationMoveTopicArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/graphql/mutations/helper/verifyCourseEditPermissions';
import { moveTopic } from '@/helpers/course/updates/updateCourseBasicInfo';
import { IncomingMessage } from 'http';

export default async function addTopicMutation(_: unknown, args: MutationMoveTopicArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.topicInfo.courseKey);

    return await moveTopic(decodedJwt.accountId, space, args.topicInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
