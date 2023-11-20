import { logEventInDiscord } from '@/helpers/adapters/logEventInDiscord';

import { getMatchesFromEmbeddings, getMatchesFromEmbeddingsForDocumentType, MatchedDocument } from '@/helpers/chat/matches';
import { templates } from '@/helpers/chat/templates';
import { ChatBody } from '@/helpers/chat/types/chat';

import { OpenAIError } from '@/helpers/chat/utils/server';
import { getContentFromLoaderEntity } from '@/helpers/loaders/getContentFromLoaderEntity';
import { prisma } from '@/prisma';
import { DocumentInfoType, PageMetadata } from '@/types/chat/projectsContents';

import { encoding_for_model, TiktokenModel } from '@dqbd/tiktoken';
import { PineconeClient } from '@pinecone-database/pinecone';
import { Request, Response } from 'express-serve-static-core';
import { CallbackManager } from 'langchain/callbacks';
import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import uniqBy from 'lodash/uniqBy';
import { v4 } from 'uuid';

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

    const { model, messages, temperature, spaceId } = req.body as ChatBody;

    logEventInDiscord(spaceId, `Chat Question - ${messages[0].content}`);
    const encoding = encoding_for_model(model.id as TiktokenModel);

    // Build an LLM chain that will improve the user prompt
    const inquiryChain = new LLMChain({
      llm,
      prompt: new PromptTemplate({
        template: templates.newInquiryTemplate,
        inputVariables: ['question'],
      }),
    });
    const inquiryChainResult = await inquiryChain.call({
      question: [messages[0].content],
    });
    const inquiry = inquiryChainResult.text;

    await prisma.chatbotUserQuestion.create({
      data: {
        id: v4(),
        question: messages[0].content,
        spaceId,
        categories: [],
        subCategories: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Embed the user's intent and query the Pinecone index
    const embedder = new OpenAIEmbeddings();

    const embeddings = await embedder.embedQuery(inquiry);
    console.log('embeddings', embeddings.length);
    const matchedFAQs = await getMatchesFromEmbeddingsForDocumentType(embeddings, pinecone!, 7, spaceId, DocumentInfoType.FAQ);

    encoding.free();

    res.setHeader('Content-Type', 'text/plain'); // Set your Content-Type based on your stream data type
    res.setHeader('Transfer-Encoding', 'chunked');

    // Get a reader from the stream

    if (matchedFAQs.length > 0) {
      res.write('## Related Questions\n');
      for (const match of matchedFAQs) {
        const faq = await prisma.chatbotFAQ.findUnique({
          where: {
            id: match.metadata.fullContentId,
          },
        });
        if (!faq) continue;
        res.write(`
        <details>
          <summary><i>${faq.question}</i></summary>
          <b>${faq.answer}</b>
        </details>
    `);
      }
    }

    res.write('## Chatbot Response\n');

    const matches = await getMatchesFromEmbeddings(embeddings, pinecone!, 5, spaceId);

    console.log('matches', matches.length);
    const chunkedDocs: { text: string; url: string }[] = [];

    // const summary = await summarizeLongDocument(chunkedDocs!.join('\n'), messages[0].content, () => {
    //   console.log('onSummaryDone');
    // });

    const uniqueMatches = uniqBy(matches, 'metadata.fullContentId');
    for (const match of uniqueMatches) {
      const metadata = match.metadata as PageMetadata;
      const { fullContentId, url, documentType } = metadata;
      const text = await getContentFromLoaderEntity(fullContentId, documentType);
      const chunkedDoc = { text, url: url };
      chunkedDocs.push(chunkedDoc);
    }

    const promptQA = PromptTemplate.fromTemplate(templates.lastTemplate);

    const chat = new ChatOpenAI({
      streaming: true,
      modelName: 'gpt-4',
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
    console.log('question :', JSON.stringify(inquiry));
    console.log('**************************************************************************************************************');
    console.log('summary :', JSON.stringify(chunkedDocs, null, 2));
    console.log('**************************************************************************************************************');

    await chain.call({
      summaries: JSON.stringify(chunkedDocs, null, 2),
      question: inquiry,
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
