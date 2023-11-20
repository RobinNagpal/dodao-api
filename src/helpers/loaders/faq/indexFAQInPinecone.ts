import { deleteDocWithUrlInPineconeByType, indexDocsInPinecone } from '@/helpers/vectorIndexers/indexDocsInPinecone';
import { initPineconeClient } from '@/helpers/vectorIndexers/pineconeHelper';
import { prisma } from '@/prisma';
import { DocumentInfoType, PageMetadata } from '@/types/chat/projectsContents';
import { ChatbotFAQ } from '@prisma/client';
import { Document as LGCDocument } from 'langchain/dist/document';

export async function indexFAQInPinecone(spaceId: string, faqId: string) {
  const faq: ChatbotFAQ = await prisma.chatbotFAQ.findUniqueOrThrow({
    where: {
      id: faqId,
    },
  });

  const chunk = `
      Question: ${faq.question}
    
      Answer: ${faq.answer}
    `;

  const metadata: PageMetadata = {
    url: faq.url,
    fullContentId: faq.id,
    documentType: DocumentInfoType.FAQ,
  };

  const document: LGCDocument<PageMetadata> = {
    pageContent: chunk,
    metadata,
  };

  const index = await initPineconeClient();

  await deleteDocWithUrlInPineconeByType(metadata.url, index, spaceId, DocumentInfoType.FAQ);

  await indexDocsInPinecone([document], index, spaceId);
}
