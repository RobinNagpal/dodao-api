import { getMatchingDocs } from '@/api/chat/helpers/getMatchingDocs';
import { getNormalizedMatches } from '@/api/chat/helpers/getNormalizedMatches';
import { makeSummariesOfMatches } from '@/api/chat/helpers/makeSummariesOfMatches';
import { logEventInDiscord } from '@/helpers/adapters/logEventInDiscord';

import { getMatchesFromEmbeddings } from '@/helpers/chat/matches';
import { templates } from '@/helpers/chat/templates';
import { ChatBody } from '@/helpers/chat/types/chat';
import { logError } from '@/helpers/errorLogger';
import { prisma } from '@/prisma';

import { encoding_for_model, TiktokenModel } from '@dqbd/tiktoken';
import { PineconeClient } from '@pinecone-database/pinecone';
import { Request, Response } from 'express-serve-static-core';
import { CallbackManager } from 'langchain/callbacks';
import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
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

    const { model, messages, temperature, spaceId, enacted, discussed } = req.body as ChatBody;

    logEventInDiscord(spaceId, `Chat Question - ${messages[0].content}`);
    const encoding = encoding_for_model(model.id as TiktokenModel);

    // Build an LLM chain that will improve the user prompt
    // const inquiryChain = new LLMChain({
    //   llm,
    //   prompt: new PromptTemplate({
    //     template: templates.newInquiryTemplate,
    //     inputVariables: ['question'],
    //   }),
    // });
    // const inquiryChainResult = await inquiryChain.call({
    //   question: [messages[0].content],
    // });
    const inquiry = messages[0].content;

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

    encoding.free();

    res.setHeader('Content-Type', 'text/plain'); // Set your Content-Type based on your stream data type
    res.setHeader('Transfer-Encoding', 'chunked');

    // Embed the user's intent and query the Pinecone index
    const embedder = new OpenAIEmbeddings();

    // Get a reader from the stream
    const embeddings = await embedder.embedQuery(inquiry);
    const matches = await getMatchesFromEmbeddings(embeddings, pinecone!, 7, spaceId, enacted, discussed);

    console.log('matches', matches.length);

    const uniqueNormalizedMatches = await getNormalizedMatches(matches, enacted, discussed);
    const chunkedDocs = await getMatchingDocs(uniqueNormalizedMatches, inquiry);

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
    const summaries = await makeSummariesOfMatches(chunkedDocs, messages);

    console.log('**************************************************************************************************************');
    console.log('question :', JSON.stringify(inquiry));
    console.log('**************************************************************************************************************');
    console.log('summary :', JSON.stringify(summaries, null, 2));
    console.log('**************************************************************************************************************');

    await chain.call({
      summaries: JSON.stringify(summaries, null, 2),
      question: inquiry,
    });
  } catch (error) {
    res.send('Got error while processing your request.');
    res.end();
    logError(error?.toString() || 'Error in chatbot', {}, error as any, null, null);
  }
};

export default handler;
