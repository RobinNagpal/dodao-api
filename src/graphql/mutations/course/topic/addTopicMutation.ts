import { MutationAddTopicArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/graphql/mutations/helper/verifyCourseEditPermissions';
import { addTopic } from '@/helpers/course/updates/updateCourseBasicInfo';
import { IncomingMessage } from 'http';

export default async function addTopicMutation(_: unknown, args: MutationAddTopicArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.topicInfo.courseKey);

    return await addTopic(decodedJwt.accountId, space, args.topicInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
