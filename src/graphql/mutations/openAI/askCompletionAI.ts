import { MutationAskCompletionAiArgs, OpenAiCompletionResponse } from '@/graphql/generated/graphql';
import OpenAI from 'openai';
import { CompletionCreateParamsNonStreaming } from 'openai/resources';

export default async function askCompletionAI(_: any, args: MutationAskCompletionAiArgs): Promise<OpenAiCompletionResponse> {
  const createCompletionRequest: CompletionCreateParamsNonStreaming = {
    model: 'gpt-3.5-turbo-instruct',
    prompt: args.input.prompt,
    temperature: args.input.temperature || 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: false,
    n: args.input.n || 1,
  };

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log('createCompletionRequest', createCompletionRequest);

  const completion = await openai.completions.create(createCompletionRequest, { timeout: 5 * 60 * 1000 });
  return completion;
}
