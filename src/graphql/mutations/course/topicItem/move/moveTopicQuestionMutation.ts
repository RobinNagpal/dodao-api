import { MutationMoveTopicQuestionArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { moveTopicQuestion } from '@/helpers/course/updates/updateTopicQuestion';
import { IncomingMessage } from 'http';

export default async function moveTopicQuestionMutation(_: unknown, args: MutationMoveTopicQuestionArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.questionInfo.courseKey);

    return await moveTopicQuestion(decodedJwt.accountId, space, args.questionInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
