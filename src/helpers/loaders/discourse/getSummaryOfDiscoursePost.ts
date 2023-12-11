import { summarizeLongDocumentWithInquiry } from '@/helpers/chat/summarizer';
import { prisma } from '@/prisma';
import { DiscoursePost } from '@prisma/client';

export async function getSummaryOfDiscoursePost(post: DiscoursePost, question: string) {
  const otherComments = await prisma.discoursePostComment.findMany({
    where: {
      postId: post.id,
    },
  });

  const otherCommentsText = otherComments.map((c) => c.content).join('\n\n');

  if (post.aiSummary) {
    return post.aiSummaryDate ? `${post.aiSummaryDate} \n\n\n ${post.aiSummary}` : post.aiSummary;
  }

  const summary = await summarizeLongDocumentWithInquiry(`${post?.fullContent} \n\n ${otherCommentsText}`, question, () => {
    console.log('onSummaryDone');
  });
  return summary;
}
