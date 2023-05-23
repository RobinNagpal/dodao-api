import { MutationUpdateTopicBasicInfoArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { updateTopicInfo } from '@/helpers/course/updates/updateCourseBasicInfo';
import { IncomingMessage } from 'http';

export default async function addTopicMutation(_: unknown, args: MutationUpdateTopicBasicInfoArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.topicInfo.courseKey);

    return await updateTopicInfo(decodedJwt.accountId, space, args.topicInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
