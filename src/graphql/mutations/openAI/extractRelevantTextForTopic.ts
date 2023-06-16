import { extractInformationForTopic } from '@/ai/process/extractInformationForTopic';
import { MutationExtractRelevantTextForTopicArgs } from '@/graphql/generated/graphql';

export default async function extractRelevantTextForTopic(_: any, args: MutationExtractRelevantTextForTopicArgs) {
  return await extractInformationForTopic(args.input.content, args.input.topic);
}
