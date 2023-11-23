import { prisma } from '@/prisma';
import { DocumentInfoType } from '@/types/chat/projectsContents';

export async function getContentFromLoaderEntity(entityId: string, documentInfoType: DocumentInfoType): Promise<string> {
  console.log('getContentFromLoaderEntity', entityId, documentInfoType);

  if (documentInfoType === DocumentInfoType.FAQ) {
    const faq = await prisma.chatbotFAQ.findUnique({
      where: {
        id: entityId,
      },
    });

    return faq
      ? `
      Question: ${faq.question}
      
      Answer: ${faq.answer}
    
    `
      : '';
  }

  if (documentInfoType === DocumentInfoType.DISCOURSE_POST) {
    const post = await prisma.discoursePost.findUnique({
      where: {
        id: entityId,
      },
    });

    return post?.fullContent || '';
  }

  if (documentInfoType === DocumentInfoType.DISCOURSE_COMMENT) {
    const comment = await prisma.discoursePostComment.findUnique({
      where: {
        id: entityId,
      },
    });

    console.log(`return comment content for ${entityId}`, comment?.content);
    console.log(`comment:`, comment);
    return comment?.content || '';
  }

  if (documentInfoType === DocumentInfoType.ARTICLE_INDEXING_INFO) {
    const article = await prisma.articleIndexingInfo.findUnique({
      where: {
        id: entityId,
      },
    });

    return article?.text || '';
  }

  if (documentInfoType === DocumentInfoType.SCRAPED_URL_INFO) {
    const scrapedUrlInfo = await prisma.scrapedUrlInfo.findUnique({
      where: {
        id: entityId,
      },
    });

    return scrapedUrlInfo?.text || '';
  }

  return '';
}
