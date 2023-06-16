import downloadFromAllLinks from '@/ai/text/downloadFromAllLinks';
import { MutationDownloadAndCleanContentArgs } from '@/graphql/generated/graphql';

export default async function downloadAndCleanContent(_: any, args: MutationDownloadAndCleanContentArgs) {
  return await downloadFromAllLinks(args.input);
}
