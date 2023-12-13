import { QuerySearchChatbotFaQsArgs } from '@/graphql/generated/graphql';
import { getMatchesFromEmbeddingsForDocumentType, MatchedDocument } from '@/helpers/chat/matches';
import { templates } from '@/helpers/chat/templates';
import { prisma } from '@/prisma';
import { DocumentInfoType } from '@/types/chat/projectsContents';
import { PineconeClient } from '@pinecone-database/pinecone';
import { LLMChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import uniqBy from 'lodash/uniqBy';

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
  const matchedFAQs: MatchedDocument[] = (await getMatchesFromEmbeddingsForDocumentType(embeddings, pinecone!, 2, spaceId, DocumentInfoType.FAQ)).filter(
    (faq) => (faq?.score || 0) > 0.85,
  );

  const matchedFAQsMap = Object.fromEntries(matchedFAQs.map((faq) => [faq.metadata.fullContentId, faq]));

  console.log('matchedFAQs', JSON.stringify(matchedFAQs, null, 2));

  const faqs = await prisma.chatbotFAQ.findMany({
    where: {
      id: {
        in: matchedFAQs.map((faq) => faq.metadata.fullContentId),
      },
    },
  });

  const faqsWithScore = uniqBy(
    faqs.map((faq) => ({
      ...faq,
      score: matchedFAQsMap[faq.id].score || 0,
    })),
    'id',
  );
  return faqsWithScore.sort((a, b) => b.score - a.score);
}
