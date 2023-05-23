import { MutationDeleteTopicVideoArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { deleteTopicVideo } from '@/helpers/course/updates/updateTopicVideo';
import { IncomingMessage } from 'http';

export default async function deleteTopicVideoMutation(_: unknown, args: MutationDeleteTopicVideoArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.videoInfo.courseKey);

    return await deleteTopicVideo(decodedJwt.accountId, space, args.videoInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
