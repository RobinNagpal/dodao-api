import { getEmbeddingVector } from '@/helpers/vectorIndexers/getEmbeddingVectors';
import { DocumentInfoType, PageMetadata } from '@/types/chat/projectsContents';
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';
import { Document } from 'langchain/document';

export async function indexDocsInPinecone(allDocs: Document<PageMetadata>[], index: VectorOperationsApi, namespace: string) {
  for (const doc of allDocs) {
    const vector = await getEmbeddingVector(doc);

    try {
      await index.upsert({
        upsertRequest: {
          namespace,
          vectors: [vector],
        },
      });
    } catch (e) {
      console.error(e);
      console.error('Error indexing chunk', vector);
    }
  }
}

export async function deleteDocWithUrlInPinecone(url: string, index: VectorOperationsApi, namespace: string) {
  // const chunks = sliceIntoChunks(vectors, 2);

  try {
    await index._delete({
      deleteRequest: {
        namespace,
        filter: {
          url: { $eq: url },
        },
      },
    });
  } catch (e) {
    console.error(e);
    console.error('Error deleting the content in pinecone: ', url);
  }
}

export async function deleteDocWithUrlInPineconeByType(url: string, index: VectorOperationsApi, namespace: string, type: DocumentInfoType) {
  try {
    await index._delete({
      deleteRequest: {
        namespace,
        filter: {
          url: { $eq: url },
          documentType: { $eq: type },
        },
      },
    });
  } catch (e) {
    console.error(e);
    console.error('Error deleting the content in pinecone: ', url);
  }
}
