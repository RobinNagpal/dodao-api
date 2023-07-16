import { MutationAskChatCompletionAiArgs, OpenAiChatCompletionResponse } from '@/graphql/generated/graphql';
import { formatAxiosError } from '@/helpers/adapters/errorLogger';
import { Configuration, OpenAIApi } from 'openai';
import { CreateChatCompletionRequest } from 'openai/api';

export default async function askChatCompletionAI(
  _: any,
  args: MutationAskChatCompletionAiArgs & { retryCount?: number },
): Promise<OpenAiChatCompletionResponse> {
  try {
    const createCompletionRequest: CreateChatCompletionRequest = {
      model: args.input.model || 'gpt-3.5-turbo',
      messages: args.input.messages,
      temperature: args.input.temperature || 0.4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: false,
      n: args.input.n || 1,
    };

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion(createCompletionRequest, { timeout: 5 * 60 * 1000 });

    return completion.data!;
  } catch (error) {
    console.error(formatAxiosError(error));
    await new Promise((resolve) => setTimeout(resolve, 10000));
    if (!args.retryCount || args.retryCount < 3) {
      console.log('Retrying...');
      let retryCount = args.retryCount || 0;
      return askChatCompletionAI(_, { ...args, retryCount: ++retryCount });
    }

    throw error;
  }
}
