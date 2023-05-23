import { MutationAddTopicSummaryArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/graphql/mutations/helper/verifyCourseEditPermissions';
import { addTopicSummary } from '@/helpers/course/updates/updateTopicSummary';
import { IncomingMessage } from 'http';

export default async function addTopicSummaryMutation(_: unknown, args: MutationAddTopicSummaryArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.summaryInfo.courseKey);

    return await addTopicSummary(decodedJwt.accountId, space, args.summaryInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
