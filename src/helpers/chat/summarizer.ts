import { getTokenCount } from '@/ai/getTokenCount';
import { templates } from '@/helpers/chat/templates';

import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

const llm = new OpenAI({
  maxConcurrency: 10,
  temperature: 0,
  modelName: 'gpt-3.5-turbo',
});
const template = templates.summarizerTemplate;

const promptTemplate = new PromptTemplate({
  template,
  inputVariables: ['document', 'inquiry'],
});

const chunkSubstr = (str: string, size: number) => {
  const numChunks = Math.ceil(str.length / size);
  return Array.from({ length: numChunks }, (_, i) => str.substring(i * size, (i + 1) * size));
};

const summarize = async (document: string, inquiry: string, onSummaryDone: (value: string) => void) => {
  const chain = new LLMChain({
    prompt: promptTemplate,
    llm,
  });

  try {
    const result = await chain.call({
      prompt: promptTemplate,
      document,
      inquiry,
    });

    return result.text;
  } catch (e) {
    console.log(e);
  }
};

const summarizeLongDocument = async (document: string, inquiry: string, onSummaryDone: (value: string) => void): Promise<string> => {
  // Chunk document into 8000 character chunks
  try {
    if (getTokenCount(document) > 2000) {
      const chunks = chunkSubstr(document, 8000);

      // Map each chunk to a promise
      const promises = chunks.map((chunk) => summarize(chunk, inquiry, onSummaryDone).catch((e) => ''));

      // Use Promise.allSettled to handle all promises in parallel
      const results = await Promise.allSettled(promises);

      // Filter out rejected promises and extract values from fulfilled ones
      const summarizedChunks = results.map((result) => (result.status === 'fulfilled' ? result.value : ''));

      const result = summarizedChunks.join('\n');

      if (getTokenCount(result) > 2000) {
        return await summarizeLongDocument(result, inquiry, onSummaryDone);
      } else return result;
    } else {
      return document;
    }
  } catch (e) {
    // Return an empty string in case of any exceptions
    return '';
  }
};
export { summarizeLongDocument };
