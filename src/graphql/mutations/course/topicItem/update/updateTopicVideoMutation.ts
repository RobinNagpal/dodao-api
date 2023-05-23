import { MutationUpdateTopicVideoArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { updateTopicVideo } from '@/helpers/course/updates/updateTopicVideo';
import { IncomingMessage } from 'http';

export default async function updateTopicVideoMutation(_: unknown, args: MutationUpdateTopicVideoArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.videoInfo.courseKey);

    return await updateTopicVideo(decodedJwt.accountId, space, args.videoInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
