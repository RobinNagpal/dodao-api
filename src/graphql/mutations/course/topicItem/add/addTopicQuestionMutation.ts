import { MutationAddTopicQuestionArgs } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { addTopicQuestion } from '@/helpers/course/updates/updateTopicQuestion';
import { IncomingMessage } from 'http';

export default async function addTopicQuestionMutation(_: unknown, args: MutationAddTopicQuestionArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.questionInfo.courseKey);

    return await addTopicQuestion(decodedJwt.accountId, space, args.questionInfo);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
