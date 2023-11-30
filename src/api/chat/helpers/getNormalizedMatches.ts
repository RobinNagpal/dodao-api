import { MatchedDocument } from '@/helpers/chat/matches';
import { getNormalizedEntries } from '@/helpers/loaders/getContentFromLoaderEntity';
import { PageMetadata } from '@/types/chat/projectsContents';
import uniqBy from 'lodash/uniqBy';

export async function getNormalizedMatches(matches: MatchedDocument[], enacted: boolean, discussed: boolean) {
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
