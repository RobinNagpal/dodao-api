import { ImagesResponse, MutationGenerateImageArgs } from '@/graphql/generated/graphql';
import { Configuration, OpenAIApi } from 'openai';
import { CreateImageRequest } from 'openai/api';

export default async function generateImage(_: any, args: MutationGenerateImageArgs): Promise<ImagesResponse> {
  const createCompletionRequest: CreateImageRequest = {
    prompt: args.input.prompt,
    size: '512x512',
    n: 1,
  };

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createImage(createCompletionRequest, { timeout: 5 * 60 * 1000 });

  return response.data;
}
