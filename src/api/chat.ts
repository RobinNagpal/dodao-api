import { ChatBody } from '@/helpers/chat/types/chat';

import { OpenAIError } from '@/helpers/chat/utils/server';

import { getMatchesFromEmbeddings, Metadata } from '@/helpers/chat/matches';
import { summarizeLongDocument } from '@/helpers/chat/summarizer';
import { templates } from '@/helpers/chat/templates';

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

    const { model, messages, prompt, temperature, spaceId } = req.body as ChatBody;

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
    const matches = await getMatchesFromEmbeddings(embeddings, pinecone!, 7, spaceId);

    console.log('matches', matches.length);

    // const urls = docs && Array.from(new Set(docs.map(doc => doc.metadata.url)))

    const fullDocuments = matches.map((match) => {
      const metadata = match.metadata as Metadata;
      const { text, url } = metadata;
      return { text, url };
    });

    const chunkedDocs =
      matches &&
      Array.from(
        new Set(
          matches.map((match) => {
            const metadata = match.metadata as Metadata;
            const { chunk, url } = metadata;
            return { text: chunk, url: url };
          }),
        ),
      );

    const promptQA = PromptTemplate.fromTemplate(templates.lastTemplate);

    // const summary = await summarizeLongDocument(chunkedDocs!.join('\n'), messages[0].content, () => {
    //   console.log('onSummaryDone');
    // });

    encoding.free();

    res.setHeader('Content-Type', 'text/plain'); // Set your Content-Type based on your stream data type
    res.setHeader('Transfer-Encoding', 'chunked');

    // Get a reader from the stream

    const chat = new ChatOpenAI({
      streaming: true,
      modelName: 'gpt-3.5-turbo',
      callbackManager: CallbackManager.fromHandlers({
        async handleLLMNewToken(token) {
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
    console.log('**************************************************************************************************************');
    console.log('question :', JSON.stringify(prompt));
    console.log('**************************************************************************************************************');
    console.log('summary :', JSON.stringify(chunkedDocs));
    console.log('**************************************************************************************************************');

    await chain.call({
      summaries: JSON.stringify(chunkedDocs, null, 2),
      question: prompt,
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
