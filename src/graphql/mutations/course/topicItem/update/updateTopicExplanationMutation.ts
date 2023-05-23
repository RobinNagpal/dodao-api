import { MutationUpdateTopicExplanationArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { updateTopicExplanation } from '@/helpers/course/updates/updateTopicExplanation';
import { IncomingMessage } from 'http';

export default async function updateTopicExplanationMutation(_: unknown, args: MutationUpdateTopicExplanationArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.explanationInfo.courseKey);

    return await updateTopicExplanation(decodedJwt.accountId, space, args.explanationInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
