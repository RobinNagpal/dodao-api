import { MutationAddTopicVideoArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/graphql/mutations/helper/verifyCourseEditPermissions';
import { addTopicVideo } from '@/helpers/course/updates/updateTopicVideo';
import { IncomingMessage } from 'http';

export default async function addTopicVideoMutation(_: unknown, args: MutationAddTopicVideoArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.videoInfo.courseKey);

    return await addTopicVideo(decodedJwt.accountId, space, args.videoInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
