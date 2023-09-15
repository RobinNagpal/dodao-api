import { ChatBody } from './types/chat';

import { OpenAIError } from './utils/server';

import { getMatchesFromEmbeddings, Metadata } from './matches';
import { summarizeLongDocument } from './summarizer';
import { templates } from './templates';

import { encoding_for_model, TiktokenModel } from '@dqbd/tiktoken';
import { PineconeClient } from '@pinecone-database/pinecone';
import { CallbackManager } from 'langchain/callbacks';
import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { Request, Response } from 'express-serve-static-core';
const llm = new OpenAI({});
let pinecone: PineconeClient | null = null;

const initPineconeClient = async () => {
  pinecone = new PineconeClient();
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

const handler = async (req: Request, res: Response) => {
  try {
    if (!pinecone) {
      await initPineconeClient();
    }

    console.log('body', req.body);

    const { model, messages, prompt, temperature, spaceId } = req.body as ChatBody;

    console.log('messages', messages);
    const encoding = encoding_for_model(model.id as TiktokenModel);

    // Build an LLM chain that will improve the user prompt
    const inquiryChain = new LLMChain({
      llm,
      prompt: new PromptTemplate({
        template: templates.inquiryTemplate,
        inputVariables: ['userPrompt', 'conversationHistory'],
      }),
    });
    const inquiryChainResult = await inquiryChain.call({
      userPrompt: prompt,
      conversationHistory: messages.map((m) => m.content),
    });
    const inquiry = inquiryChainResult.text;

    // Embed the user's intent and query the Pinecone index
    const embedder = new OpenAIEmbeddings();

    const embeddings = await embedder.embedQuery(inquiry);

    console.log('embeddings', embeddings.length);
    const matches = await getMatchesFromEmbeddings(embeddings, pinecone!, 3, spaceId);

    console.log('matches', matches.length);

    // const urls = docs && Array.from(new Set(docs.map(doc => doc.metadata.url)))

    const urls =
      matches &&
      Array.from(
        new Set(
          matches.map((match) => {
            const metadata = match.metadata as Metadata;
            const { url } = metadata;
            return url;
          }),
        ),
      );

    console.log(urls);

    const fullDocuments =
      matches &&
      Array.from(
        matches.reduce((map, match) => {
          const metadata = match.metadata as Metadata;
          const { text, url } = metadata;
          if (!map.has(url)) {
            map.set(url, text);
          }
          return map;
        }, new Map()),
      ).map(([_, text]) => text);

    const chunkedDocs =
      matches &&
      Array.from(
        new Set(
          matches.map((match) => {
            const metadata = match.metadata as Metadata;
            const { chunk } = metadata;
            return chunk;
          }),
        ),
      );

    const promptQA = PromptTemplate.fromTemplate(templates.qaTemplate);

    const summary = await summarizeLongDocument(fullDocuments!.join('\n'), inquiry, () => {
      console.log('onSummaryDone');
    });

    encoding.free();

    res.setHeader('Content-Type', 'text/plain'); // Set your Content-Type based on your stream data type
    res.setHeader('Transfer-Encoding', 'chunked');

    // Get a reader from the stream

    const chat = new ChatOpenAI({
      streaming: true,
      verbose: true,
      modelName: 'gpt-3.5-turbo',
      callbackManager: CallbackManager.fromHandlers({
        async handleLLMNewToken(token) {
          console.log(token);
          res.write(token);
        },
        async handleLLMEnd(result) {
          res.end();
        },
      }),
    });

    const chain = new LLMChain({
      prompt: promptQA,
      llm: chat,
    });

    await chain.call({
      summaries: summary,
      question: prompt,
      conversationHistory: messages.map((m) => m.content),
      urls,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler;
