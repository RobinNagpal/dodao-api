import { MutationDeleteTopicQuestionArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { deleteTopicQuestion } from '@/helpers/course/updates/updateTopicQuestion';
import { IncomingMessage } from 'http';

export default async function deleteTopicQuestionMutation(_: unknown, args: MutationDeleteTopicQuestionArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.questionInfo.courseKey);

    return await deleteTopicQuestion(decodedJwt.accountId, space, args.questionInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
