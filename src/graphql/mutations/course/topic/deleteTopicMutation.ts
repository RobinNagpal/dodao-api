import { MutationDeleteTopicArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { deleteTopic } from '@/helpers/course/updates/updateCourseBasicInfo';
import { IncomingMessage } from 'http';

export default async function deleteTopicMutation(_: unknown, args: MutationDeleteTopicArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.topicInfo.courseKey);

    return await deleteTopic(decodedJwt.accountId, space, args.topicInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
