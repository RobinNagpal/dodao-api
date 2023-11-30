import { DocumentInfoType, PageMetadata } from '@/types/chat/projectsContents';
import { Document as LGCDocument } from 'langchain/document';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export async function split(docs: LGCDocument<PageMetadata>[]): Promise<LGCDocument<PageMetadata>[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 8000,
    chunkOverlap: 400,
  });

  const flatMap: LGCDocument<PageMetadata>[] = (
    await Promise.all(
      docs.map(async (doc) => {
        const splits = doc.pageContent ? await splitter.splitText(doc.pageContent) : [];
        return splits.map((text, i) => {
          return new LGCDocument({ pageContent: text, metadata: { ...doc.metadata, chunk: text } });
        });
      }),
    )
  ).flat();
  return flatMap;
}

export function splitFullContent(doc: LGCDocument<Omit<PageMetadata, 'chunk'>>): LGCDocument<PageMetadata>[] {
  const splits = splitString(doc.pageContent || '', 1020 * 10);

  console.log('Splitting full content', doc.metadata.url, ' into: ', splits.length);

  return splits.map((text, i) => {
    return new LGCDocument({ pageContent: text, metadata: doc.metadata });
  });
}

function splitString(input: string, maxLen: number = 1020 * 10): string[] {
  const numberOfSplits = Math.ceil(input.length / maxLen);
  const result: string[] = [];

  for (let i = 0; i < numberOfSplits; i++) {
    result.push(input.slice(i * maxLen, (i + 1) * maxLen));
  }

  return result;
}
