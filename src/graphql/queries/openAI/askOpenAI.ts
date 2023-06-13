import { OpenAiChatResponse, QueryAskOpenAiArgs } from '@/graphql/generated/graphql';
import { Configuration, OpenAIApi } from 'openai';
import { CreateChatCompletionRequest } from 'openai/api';

export default async function askOpenAI(_: any, args: QueryAskOpenAiArgs): Promise<OpenAiChatResponse> {
  const createChatCompletionRequest: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages: args.messages,
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
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion(createChatCompletionRequest, { timeout: 5 * 60 * 1000 });

  return completion.data!;
}
