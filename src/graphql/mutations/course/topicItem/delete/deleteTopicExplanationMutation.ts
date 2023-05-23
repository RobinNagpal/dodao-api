import { MutationDeleteTopicExplanationArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { deleteTopicExplanation } from '@/helpers/course/updates/updateTopicExplanation';
import { IncomingMessage } from 'http';

export default async function deleteTopicExplanationMutation(_: unknown, args: MutationDeleteTopicExplanationArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.explanationInfo.courseKey);

    return await deleteTopicExplanation(decodedJwt.accountId, space, args.explanationInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
