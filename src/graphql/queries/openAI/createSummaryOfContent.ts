import { generateSummaryOfContent } from '@/ai/process/createSummary';
import { QueryCreateSummaryOfContentArgs } from '@/graphql/generated/graphql';

export default async function createSummaryOfContent(_: any, args: QueryCreateSummaryOfContentArgs) {
  return await generateSummaryOfContent(args.input);
}
