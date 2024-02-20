import { MutationGenerateImageArgs, ImagesResponse } from '@/graphql/generated/graphql';
import OpenAI from 'openai';
import { ImageGenerateParams } from 'openai/resources';

export default async function generateImage(_: any, args: MutationGenerateImageArgs): Promise<ImagesResponse> {
  const createCompletionRequest: ImageGenerateParams = {
    model: 'dall-e-3',
    prompt: args.input.prompt,
    size: '1024x1024',
    n: 1,
  };

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.images.generate(createCompletionRequest, { timeout: 5 * 60 * 1000 });

  return response;
}
