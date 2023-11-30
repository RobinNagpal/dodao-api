import { getContentFromLoaderEntity } from '@/helpers/loaders/getContentFromLoaderEntity';
import { PageMetadata } from '@/types/chat/projectsContents';

export async function getMatchingDocs(uniqueNormalizedMatches: PageMetadata[], inquiry: string) {
  const chunkedDocs: { text: string; url: string; score?: number }[] = [];
  for (const match of uniqueNormalizedMatches) {
    const text = await getContentFromLoaderEntity(match.fullContentId, match.documentType, inquiry);
    const chunkedDoc = { text, url: match.url };
    chunkedDocs.push(chunkedDoc);
  }
  return chunkedDocs;
}
