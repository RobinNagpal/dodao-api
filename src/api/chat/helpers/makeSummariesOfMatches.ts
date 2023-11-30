import { getTokenCount } from '@/ai/getTokenCount';
import { summarizeLongDocument } from '@/helpers/chat/summarizer';
import { Message } from '@/helpers/chat/types/chat';

export async function makeSummariesOfMatches(
  chunkedDocs: {
    text: string;
    url: string;
    score?: number;
  }[],
  messages: Message[],
) {
  const summaries: { text: string; url: string; score?: number }[] = [];
  for (const chunkedDoc of chunkedDocs) {
    if (getTokenCount(chunkedDoc.text) > 1500) {
      const summary = await summarizeLongDocument(chunkedDoc.text, messages[0].content, () => {
        console.log('onSummaryDone');
      });

      console.log('summary of chunked doc', summary);
      summaries.push({ text: summary, url: chunkedDoc.url, score: chunkedDoc.score });
    } else {
      summaries.push(chunkedDoc);
    }
  }
  return summaries;
}
