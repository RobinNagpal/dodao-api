import { MutationUpdateCourseBasicInfoArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/graphql/mutations/helper/verifyCourseEditPermissions';
import { updateCourseBasicInfo } from '@/helpers/course/updates/updateCourseBasicInfo';
import { IncomingMessage } from 'http';

export default async function updateCourseBasicInfoMutation(_: unknown, args: MutationUpdateCourseBasicInfoArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.courseBasicInfo.key);

    return await updateCourseBasicInfo(decodedJwt.accountId, space, args.courseBasicInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
