import { getTokenCount } from '@/ai/getTokenCount';
import { generateSummaryOfContent } from '@/ai/process/createSummary';
import { MutationCreateSummaryOfContentArgs, OpenAiTextResponse } from '@/graphql/generated/graphql';

export default async function createSummaryOfContent(_: any, args: MutationCreateSummaryOfContentArgs): Promise<OpenAiTextResponse> {
  const text = await generateSummaryOfContent(args.input);
  return { text, tokenCount: getTokenCount(text) };
}
