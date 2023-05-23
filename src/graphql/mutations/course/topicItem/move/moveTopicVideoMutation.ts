import { MutationMoveTopicVideoArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { moveTopicVideo } from '@/helpers/course/updates/updateTopicVideo';
import { IncomingMessage } from 'http';

export default async function moveTopicVideoMutation(_: unknown, args: MutationMoveTopicVideoArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.videoInfo.courseKey);

    return await moveTopicVideo(decodedJwt.accountId, space, args.videoInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
