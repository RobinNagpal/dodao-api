import { MutationDeleteTopicSummaryArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { deleteTopicSummary } from '@/helpers/course/updates/updateTopicSummary';
import { IncomingMessage } from 'http';

export default async function deleteTopicSummaryMutation(_: unknown, args: MutationDeleteTopicSummaryArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.summaryInfo.courseKey);

    return await deleteTopicSummary(decodedJwt.accountId, space, args.summaryInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
