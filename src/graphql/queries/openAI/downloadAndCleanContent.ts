import downloadFromAllLinks from '@/ai/text/downloadFromAllLinks';
import { QueryDownloadAndCleanContentArgs } from '@/graphql/generated/graphql';

export default async function downloadAndCleanContent(_: any, args: QueryDownloadAndCleanContentArgs) {
  return await downloadFromAllLinks(args.input);
}
