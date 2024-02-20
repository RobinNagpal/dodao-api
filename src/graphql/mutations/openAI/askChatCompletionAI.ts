import { MutationAskChatCompletionAiArgs, OpenAiChatCompletionResponse } from '@/graphql/generated/graphql';

import { formatAxiosError } from '@/helpers/adapters/formatAxiosError';
import OpenAI from 'openai';
import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources';

export default async function askChatCompletionAI(
  _: any,
  args: MutationAskChatCompletionAiArgs & { retryCount?: number },
): Promise<OpenAiChatCompletionResponse> {
  try {
    const createCompletionRequest: ChatCompletionCreateParamsNonStreaming = {
      model: args.input.model || 'gpt-3.5-turbo',
      messages: args.input.messages,
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

    const completion = await openai.chat.completions.create(createCompletionRequest, { timeout: 5 * 60 * 1000 });

    return completion;
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
