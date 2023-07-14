import { MutationAddTopicQuestionsArgs } from '@/graphql/generated/graphql';
import { addTopicQuestions } from '@/helpers/course/updates/questions/addTopicQuestions';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { IncomingMessage } from 'http';

export default async function addTopicQuestionsMutation(_: unknown, args: MutationAddTopicQuestionsArgs, context: IncomingMessage) {
  try {
    const { space, decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.input.courseKey);

    return await addTopicQuestions(decodedJwt.accountId, space, args.input);
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
