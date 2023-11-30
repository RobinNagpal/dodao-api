import { logError } from '@/helpers/errorLogger';
import { getContentFromLoaderEntity } from '@/helpers/loaders/getContentFromLoaderEntity';
import { PageMetadata } from '@/types/chat/projectsContents';

interface ChunkedDoc {
  text: string;
  url: string;
  score?: number;
}

/**
 * If you don't understand this function, refer to the simpler serial version below.
 * @param uniqueNormalizedMatches
 * @param inquiry
 */
export async function getMatchingDocs(uniqueNormalizedMatches: PageMetadata[], inquiry: string): Promise<ChunkedDoc[]> {
  // Map each match to a promise with explicit type annotation
  const promises: Promise<ChunkedDoc | null>[] = uniqueNormalizedMatches.map(async (match): Promise<ChunkedDoc | null> => {
    try {
      const text: string = await getContentFromLoaderEntity(match.fullContentId, match.documentType, inquiry);
      return { text, url: match.url };
    } catch (e) {
      // Return null in case of an error, effectively skipping the failed promise
      logError(e?.toString() || 'Error in getMatchingDocs', {}, e as any, null, null);
      return null;
    }
  });

  // Use Promise.allSettled to handle all promises in parallel
  const results: PromiseSettledResult<ChunkedDoc | null>[] = await Promise.allSettled(promises);

  // Filter out rejected promises and extract values from fulfilled ones
  const successfulResults: ChunkedDoc[] = results
    .filter((result): result is PromiseFulfilledResult<ChunkedDoc> => result.status === 'fulfilled' && result.value !== null)
    .map((result) => result.value);

  return successfulResults;
}

export async function getMatchingDocsSerially(uniqueNormalizedMatches: PageMetadata[], inquiry: string) {
  const chunkedDocs: { text: string; url: string; score?: number }[] = [];
  for (const match of uniqueNormalizedMatches) {
    const text = await getContentFromLoaderEntity(match.fullContentId, match.documentType, inquiry);
    const chunkedDoc = { text, url: match.url };
    chunkedDocs.push(chunkedDoc);
  }
  return chunkedDocs;
}
