import { MatchedDocument } from '@/helpers/chat/matches';
import { logError } from '@/helpers/errorLogger';
import { getNormalizedEntries } from '@/helpers/loaders/getContentFromLoaderEntity';
import { PageMetadata } from '@/types/chat/projectsContents';
import uniqBy from 'lodash/uniqBy';

/**
 * If you don't understand this function, refer to the simpler serial version below.
 * @param matches
 * @param enacted
 * @param discussed
 */
export async function getNormalizedMatches(matches: MatchedDocument[], enacted: boolean, discussed: boolean): Promise<PageMetadata[]> {
  const uniqueMatches: MatchedDocument[] = uniqBy(matches, 'metadata.fullContentId');

  // Map each match to a promise with explicit type annotation
  const promises: Promise<PageMetadata | null | undefined>[] = uniqueMatches.map((match) =>
    getNormalizedEntries(match.metadata, enacted, discussed).catch((e: Error): null => {
      logError(e?.toString() || 'Error in getNormalizedMatches', {}, e as any, null, null);
      return null;
    }),
  );

  // Use Promise.allSettled to handle all promises in parallel
  const results: PromiseSettledResult<PageMetadata | null | undefined>[] = await Promise.allSettled(promises);

  // Filter out rejected promises and extract values from fulfilled ones
  const successfulResults: PageMetadata[] = results
    .filter((result): result is PromiseFulfilledResult<PageMetadata> => result.status === 'fulfilled' && result.value !== null)
    .map((result) => result.value);

  const uniqueNormalizedMatches: PageMetadata[] = uniqBy(successfulResults, 'fullContentId');
  return uniqueNormalizedMatches;
}

export async function getNormalizedMatchesSerially(matches: MatchedDocument[], enacted: boolean, discussed: boolean) {
  const uniqueMatches = uniqBy(matches, 'metadata.fullContentId');
  const normalizedMatches: PageMetadata[] = [];

  for (const match of uniqueMatches) {
    const metadata = await getNormalizedEntries(match.metadata, enacted, discussed);
    if (metadata) {
      normalizedMatches.push(metadata);
    }
  }

  const uniqueNormalizedMatches = uniqBy(normalizedMatches, 'fullContentId');
  return uniqueNormalizedMatches;
}
