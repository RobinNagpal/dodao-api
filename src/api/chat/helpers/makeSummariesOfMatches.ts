import { getTokenCount } from '@/ai/getTokenCount';
import { summarizeLongDocument } from '@/helpers/chat/summarizer';
import { Message } from '@/helpers/chat/types/chat';
import { logError } from '@/helpers/errorLogger';

interface ChunkedDoc {
  text: string;
  url: string;
  score?: number;
}

/**
 *  If you don't understand this function, refer to the simpler serial version below.
 *
 * @param chunkedDocs
 * @param messages
 */
export async function makeSummariesOfMatches(chunkedDocs: ChunkedDoc[], messages: Message[]): Promise<ChunkedDoc[]> {
  // Convert each chunkedDoc into a promise
  const promises: Promise<ChunkedDoc | null>[] = chunkedDocs.map((chunkedDoc): Promise<ChunkedDoc | null> => {
    return getTokenCount(chunkedDoc.text) > 1500
      ? summarizeLongDocument(chunkedDoc.text, messages[0].content, () => {
          console.log('onSummaryDone');
        })
          .then((summary): ChunkedDoc => ({ text: summary, url: chunkedDoc.url, score: chunkedDoc.score }))
          .catch((e: Error): null => {
            logError(e?.toString() || 'Error in makeSummariesOfMatches', {}, e as any, null, null);
            return null;
          })
      : Promise.resolve(chunkedDoc);
  });

  // Use Promise.allSettled to handle all promises in parallel
  const results: PromiseSettledResult<ChunkedDoc | null>[] = await Promise.allSettled(promises);

  // Filter out rejected promises and extract values from fulfilled ones
  const successfulResults: ChunkedDoc[] = results
    .filter((result): result is PromiseFulfilledResult<ChunkedDoc> => result.status === 'fulfilled' && result.value !== null)
    .map((result) => result.value);

  return successfulResults;
}

export async function makeSummariesOfMatchesSerially(
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
