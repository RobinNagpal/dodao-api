import { QuerySearchChatbotFaQsArgs } from '@/graphql/generated/graphql';
import { getMatchesFromEmbeddingsForDocumentType } from '@/helpers/chat/matches';
import { templates } from '@/helpers/chat/templates';
import { prisma } from '@/prisma';
import { DocumentInfoType } from '@/types/chat/projectsContents';
import { PineconeClient } from '@pinecone-database/pinecone';
import { LLMChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

let pinecone: PineconeClient | null = null;

const llm = new OpenAI({});
const initPineconeClient = async () => {
  pinecone = new PineconeClient();
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};
export default async function searchChatbotFAQs(_: any, { spaceId, query }: QuerySearchChatbotFaQsArgs) {
  if (!pinecone) {
    await initPineconeClient();
  }

  // Build an LLM chain that will improve the user prompt
  const inquiryChain = new LLMChain({
    llm,
    prompt: new PromptTemplate({
      template: templates.newInquiryTemplate,
      inputVariables: ['question'],
    }),
  });
  const inquiryChainResult = await inquiryChain.call({
    question: [query],
  });
  const inquiry = inquiryChainResult.text;

  // Embed the user's intent and query the Pinecone index
  const embedder = new OpenAIEmbeddings();

  const embeddings = await embedder.embedQuery(inquiry);
  console.log('embeddings', embeddings.length);
  const matchedFAQs = await getMatchesFromEmbeddingsForDocumentType(embeddings, pinecone!, 7, spaceId, DocumentInfoType.FAQ);

  console.log('matchedFAQs', JSON.stringify(matchedFAQs, null, 2));

  return prisma.chatbotFAQ.findMany({
    where: {
      id: {
        in: matchedFAQs.map((faq) => faq.metadata.fullContentId),
      },
    },
  });
}
