import { OpenAiCompletionResponse, QueryAskCompletionAiArgs } from '@/graphql/generated/graphql';
import { Configuration, OpenAIApi } from 'openai';
import { CreateCompletionRequest } from 'openai/api';

export default async function askCompletionAI(_: any, args: QueryAskCompletionAiArgs): Promise<OpenAiCompletionResponse> {
  const createCompletionRequest: CreateCompletionRequest = {
    model: 'gpt-3.5-turbo',
    prompt: args.prompt,
    temperature: 0.2,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: false,
    n: 1,
  };

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log('payload', createCompletionRequest);
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion(createCompletionRequest, { timeout: 5 * 60 * 1000 });

  return completion.data!;
}
