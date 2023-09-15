import { PageMetadata } from '@/types/chat/projectsContents';
import { Document as LGCDocument } from 'langchain/docstore';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export async function split(docs: LGCDocument<Omit<PageMetadata, 'chunk'>>[]): Promise<LGCDocument<PageMetadata>[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
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
