import { MutationMoveTopicExplanationArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/graphql/mutations/helper/verifyCourseEditPermissions';
import { moveTopicExplanation } from '@/helpers/course/updates/updateTopicExplanation';
import { IncomingMessage } from 'http';

export default async function moveTopicExplanationMutation(_: unknown, args: MutationMoveTopicExplanationArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.explanationInfo.courseKey);

    return await moveTopicExplanation(decodedJwt.accountId, space, args.explanationInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
