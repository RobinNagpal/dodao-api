import { getTokenCount } from '@/ai/getTokenCount';
import { extractInformationForTopic } from '@/ai/process/extractInformationForTopic';
import { MutationExtractRelevantTextForTopicArgs, OpenAiTextResponse } from '@/graphql/generated/graphql';

export default async function extractRelevantTextForTopic(_: any, args: MutationExtractRelevantTextForTopicArgs): Promise<OpenAiTextResponse> {
  const text = await extractInformationForTopic(args.input.content, args.input.topic);
  return { text, tokenCount: getTokenCount(text) };
}
