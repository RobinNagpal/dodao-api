import { extractInformationForTopic } from '@/ai/process/extractInformationForTopic';
import { ExtractRelevantTextForTopicInput } from '@/graphql/generated/graphql';

export default async function extractRelevantTextForTopic(_: any, args: ExtractRelevantTextForTopicInput) {
  return await extractInformationForTopic(args.content, args.topic);
}
