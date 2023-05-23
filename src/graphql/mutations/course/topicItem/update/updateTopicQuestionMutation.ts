import { MutationUpdateTopicQuestionArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { updateTopicQuestion } from '@/helpers/course/updates/updateTopicQuestion';
import { IncomingMessage } from 'http';

export default async function updateTopicQuestionMutation(_: unknown, args: MutationUpdateTopicQuestionArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.questionInfo.courseKey);

    return await updateTopicQuestion(decodedJwt.accountId, space, args.questionInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
