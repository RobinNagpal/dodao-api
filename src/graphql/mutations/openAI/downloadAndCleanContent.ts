import { getTokenCount } from '@/ai/getTokenCount';
import downloadFromAllLinks from '@/ai/text/downloadFromAllLinks';
import { MutationDownloadAndCleanContentArgs, OpenAiTextResponse } from '@/graphql/generated/graphql';

export default async function downloadAndCleanContent(_: any, args: MutationDownloadAndCleanContentArgs): Promise<OpenAiTextResponse> {
  const text = await downloadFromAllLinks(args.input);
  return { text, tokenCount: getTokenCount(text) };
}
