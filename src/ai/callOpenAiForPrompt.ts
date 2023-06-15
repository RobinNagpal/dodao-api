import { Configuration, OpenAIApi } from 'openai';
import tiktoken from 'tiktoken';

export async function callOpenAiForPrompt(chunk: string, promptFn: () => string) {
  const encoding = tiktoken.encoding_for_model('gpt-3.5-turbo');
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const prompt = promptFn();

  console.log('input length: ' + chunk.length);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 5000,
  });

  const summary: string = response.data.choices[0].message?.content?.trim() || '';
  console.log('output length: ' + encoding.encode(summary).length);
  return summary;
}
