import { generateSummaryOfContent } from '@/ai/process/createSummary';
import { MutationCreateSummaryOfContentArgs } from '@/graphql/generated/graphql';

export default async function createSummaryOfContent(_: any, args: MutationCreateSummaryOfContentArgs) {
  return await generateSummaryOfContent(args.input);
}
