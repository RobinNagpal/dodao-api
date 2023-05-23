import { MutationAddTopicExplanationArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/graphql/mutations/helper/verifyCourseEditPermissions';
import { addTopicExplanation } from '@/helpers/course/updates/updateTopicExplanation';
import { IncomingMessage } from 'http';

export default async function addTopicExplanationMutation(_: unknown, args: MutationAddTopicExplanationArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.explanationInfo.courseKey);

    return await addTopicExplanation(decodedJwt.accountId, space, args.explanationInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
