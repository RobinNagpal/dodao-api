import { MutationAskCompletionAiArgs, OpenAiCompletionResponse } from '@/graphql/generated/graphql';
import { Configuration, OpenAIApi } from 'openai';
import { CreateCompletionRequest } from 'openai/api';

export default async function askCompletionAI(_: any, args: MutationAskCompletionAiArgs): Promise<OpenAiCompletionResponse> {
  const createCompletionRequest: CreateCompletionRequest = {
    model: args.input.prompt || 'gpt-3.5-turbo',
    prompt: args.input.prompt,
    temperature: args.input.temperature || 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: false,
    n: 1,
  };

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion(createCompletionRequest, { timeout: 5 * 60 * 1000 });

  return completion.data!;
}
