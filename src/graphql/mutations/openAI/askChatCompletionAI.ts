import { MutationAskChatCompletionAiArgs, OpenAiChatCompletionResponse } from '@/graphql/generated/graphql';
import { Configuration, OpenAIApi } from 'openai';
import { CreateChatCompletionRequest } from 'openai/api';

export default async function askCompletionAI(_: any, args: MutationAskChatCompletionAiArgs): Promise<OpenAiChatCompletionResponse> {
  const createCompletionRequest: CreateChatCompletionRequest = {
    model: args.input.model || 'gpt-3.5-turbo',
    messages: args.input.messages,
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

  const completion = await openai.createChatCompletion(createCompletionRequest, { timeout: 5 * 60 * 1000 });

  const response = completion.data!;

  console.log('response', JSON.stringify(response, null, 2));
  return response;
}
