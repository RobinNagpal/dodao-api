import { getSummaryOfDiscoursePost } from '@/helpers/loaders/discourse/helper/getSummaryOfDiscoursePost';
import { prisma } from '@/prisma';
import { DocumentInfoType, PageMetadata } from '@/types/chat/projectsContents';

export async function getNormalizedEntries(pageMetadata: PageMetadata, enacted: boolean, discussed: boolean): Promise<PageMetadata | undefined> {
  const { fullContentId, documentType } = pageMetadata;
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

      if (post) {
        // if (post.enacted !== enacted) return undefined;
        // if (post.discussed !== discussed) return undefined;

        return {
          fullContentId: comment.postId,
          url: post.url,
          documentType: DocumentInfoType.DISCOURSE_POST,
        };
      }
    }
  } else if (documentType === DocumentInfoType.DISCOURSE_POST) {
    const post = await prisma.discoursePost.findUnique({
      where: {
        id: fullContentId,
      },
    });

    if (post) {
      // if (post.enacted !== enacted) return undefined;
      // if (post.discussed !== discussed) return undefined;

      return {
        fullContentId: post.id,
        url: post.url,
        documentType: DocumentInfoType.DISCOURSE_POST,
      };
    }
  } else {
    return pageMetadata;
  }
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

    const otherCommentsText = otherComments.map((c) => `${c.datePublished} - ${c.content}`).join('\n\n');

    return `${post?.datePublished} ${post?.fullContent} \n\n ${otherCommentsText}`;
  }

  if (documentInfoType === DocumentInfoType.DISCOURSE_COMMENT) {
    const comment = await prisma.discoursePostComment.findUnique({
      where: {
        id: entityId,
      },
    });

    if (comment) {
      const post = await prisma.discoursePost.findUniqueOrThrow({
        where: {
          id: comment.postId,
        },
      });
      const summary = await getSummaryOfDiscoursePost(post, question);

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
