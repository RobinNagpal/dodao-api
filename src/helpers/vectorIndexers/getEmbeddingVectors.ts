import { PageMetadata } from '@/types/chat/projectsContents';
import { Vector } from '@pinecone-database/pinecone';
import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { uuid } from 'uuidv4';

export async function getEmbeddingVectors(documents: Document<PageMetadata>[]): Promise<Vector[]> {
  const embedder = new OpenAIEmbeddings({
    modelName: 'text-embedding-ada-002',
  });

  //Embed the documents
  const vectors: Vector[] = await Promise.all(
    documents.flat().map(async (doc) => {
      const embedding = await embedder.embedQuery(doc.pageContent);

      return {
        id: uuid(),
        values: embedding,
        metadata: doc.metadata,
      } as Vector;
    }),
  );

  return vectors;
}

export async function getEmbeddingVector(doc: Document<PageMetadata>): Promise<Vector> {
  const embedder = new OpenAIEmbeddings({
    modelName: 'text-embedding-ada-002',
  });

  //Embed the documents

  const embedding = await embedder.embedQuery(doc.pageContent);
  console.log('done embedding', doc.metadata.url);
  return {
    id: uuid(),
    values: embedding,
    metadata: doc.metadata,
  } as Vector;
}
