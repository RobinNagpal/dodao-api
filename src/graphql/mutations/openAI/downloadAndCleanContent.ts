import downloadFromAllLinks from '@/ai/text/downloadFromAllLinks';
import { DownloadAndCleanContentResponse, MutationDownloadAndCleanContentArgs } from '@/graphql/generated/graphql';

export default async function downloadAndCleanContent(_: any, args: MutationDownloadAndCleanContentArgs): Promise<DownloadAndCleanContentResponse> {
  return await downloadFromAllLinks(args.input);
}
