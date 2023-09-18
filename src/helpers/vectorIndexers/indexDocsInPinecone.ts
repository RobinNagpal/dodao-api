import { getEmbeddingVector } from '@/helpers/vectorIndexers/getEmbeddingVectors';
import { PageMetadata } from '@/types/chat/projectsContents';
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';
import { Document } from 'langchain/document';

export async function indexDocsInPinecone(allDocs: Document<PageMetadata>[], index: VectorOperationsApi, namespace: string) {
  // const chunks = sliceIntoChunks(vectors, 2);

  for (const doc of allDocs) {
    const chunk = await getEmbeddingVector(doc);

    try {
      await index._delete({
        deleteRequest: {
          namespace,
          filter: {
            url: { $eq: doc.metadata.url },
          },
        },
      });
      await index.upsert({
        upsertRequest: {
          namespace,
          vectors: [chunk],
        },
      });
    } catch (e) {
      console.error(e);
      console.error('Error indexing chunk', chunk);
    }
  }
}
