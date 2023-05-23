import { MutationUpdateTopicSummaryArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/graphql/mutations/helper/verifyCourseEditPermissions';
import { updateTopicSummary } from '@/helpers/course/updates/updateTopicSummary';
import { IncomingMessage } from 'http';

export default async function updateTopicSummaryMutation(_: unknown, args: MutationUpdateTopicSummaryArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.summaryInfo.courseKey);

    return await updateTopicSummary(decodedJwt.accountId, space, args.summaryInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
