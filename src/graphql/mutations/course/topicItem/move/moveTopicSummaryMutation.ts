import { MutationMoveTopicSummaryArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { moveTopicSummary } from '@/helpers/course/updates/updateTopicSummary';
import { IncomingMessage } from 'http';

export default async function moveTopicSummaryMutation(_: unknown, args: MutationMoveTopicSummaryArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.summaryInfo.courseKey);

    return await moveTopicSummary(decodedJwt.accountId, space, args.summaryInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
