import { summarizeLongDocument } from '@/helpers/chat/summarizer';
import { prisma } from '@/prisma';
import { DocumentInfoType } from '@/types/chat/projectsContents';

export async function getNormalizedEntries({
  fullContentId,
  url,
  documentType,
}: {
  fullContentId: string;
  url: string;
  documentType: DocumentInfoType;
}): Promise<{ fullContentId: string; url: string; documentType: DocumentInfoType }> {
  if (documentType === DocumentInfoType.DISCOURSE_COMMENT) {
    const comment = await prisma.discoursePostComment.findUnique({
      where: {
        id: fullContentId,
      },
    });

    if (comment) {
      const post = await prisma.discoursePost.findUnique({
        where: {
          id: comment.postId,
        },
      });
      return {
        fullContentId: comment.postId,
        url: post?.url || url,
        documentType: DocumentInfoType.DISCOURSE_POST,
      };
    }
  }

  return { fullContentId, url, documentType: documentType };
}

export async function getContentFromLoaderEntity(entityId: string, documentInfoType: DocumentInfoType, question: string): Promise<string> {
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

    const otherComments = await prisma.discoursePostComment.findMany({
      where: {
        postId: entityId,
      },
    });

    const otherCommentsText = otherComments.map((c) => c.content).join('\n\n');

    return `${post?.fullContent} \n\n ${otherCommentsText}`;
  }

  if (documentInfoType === DocumentInfoType.DISCOURSE_COMMENT) {
    const comment = await prisma.discoursePostComment.findUnique({
      where: {
        id: entityId,
      },
    });

    if (comment) {
      const post = await prisma.discoursePost.findUnique({
        where: {
          id: comment.postId,
        },
      });

      const otherComments = await prisma.discoursePostComment.findMany({
        where: {
          postId: comment.postId,
        },
      });

      const otherCommentsText = otherComments.map((c) => c.content).join('\n\n');

      const summary = await summarizeLongDocument(`${post?.fullContent} \n\n ${otherCommentsText}`, question, () => {
        console.log('onSummaryDone');
      });

      return summary;
    }

    return '';
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
