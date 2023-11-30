import { DocumentInfoType, PageMetadata } from '@/types/chat/projectsContents';
import { PineconeClient, QueryRequest, ScoredVector } from '@pinecone-database/pinecone';
import { QueryOperationRequest } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/apis/VectorOperationsApi';

export interface MatchedDocument extends ScoredVector {
  metadata: PageMetadata;
}
const getMatchesFromEmbeddings = async (
  embeddings: number[],
  pinecone: PineconeClient,
  topK: number,
  spaceId: string,
  enacted: boolean,
  discussed: boolean,
): Promise<MatchedDocument[]> => {
  if (!process.env.PINECONE_INDEX_NAME) {
    throw new Error('PINECONE_INDEX_NAME is not set');
  }

  const index = pinecone!.Index(process.env.PINECONE_INDEX_NAME);
  const queryRequest: QueryRequest = {
    vector: embeddings,
    topK,
    includeMetadata: true,
    namespace: spaceId,
    filter: {
      $or: [
        { documentType: { $in: [DocumentInfoType.DISCOURSE_POST, DocumentInfoType.DISCOURSE_COMMENT], enacted, discussed } },
        {
          documentType: { $in: [DocumentInfoType.SCRAPED_URL_INFO, DocumentInfoType.ARTICLE_INDEXING_INFO, DocumentInfoType.FAQ] },
        },
      ],
    },
  };
  try {
    const queryResult = await index.query({
      queryRequest,
    });
    return (
      queryResult.matches?.map((match) => ({
        ...match,
        metadata: match.metadata as PageMetadata,
      })) || []
    );
  } catch (e) {
    console.log('Error querying embeddings: ', e);
    throw new Error(`Error querying embeddings: ${e}`);
  }
};

const getMatchesFromEmbeddingsForDocumentType = async (
  embeddings: number[],
  pinecone: PineconeClient,
  topK: number,
  spaceId: string,
  documentInfoType: DocumentInfoType,
): Promise<MatchedDocument[]> => {
  if (!process.env.PINECONE_INDEX_NAME) {
    throw new Error('PINECONE_INDEX_NAME is not set');
  }

  const index = pinecone!.Index(process.env.PINECONE_INDEX_NAME);
  const queryRequest = {
    vector: embeddings,
    topK,
    includeMetadata: true,
    namespace: spaceId,
    filter: {
      documentType: { $eq: documentInfoType },
    },
  };
  try {
    const queryResult = await index.query({
      queryRequest,
    });
    return (
      queryResult.matches?.map((match) => ({
        ...match,
        metadata: match.metadata as PageMetadata,
      })) || []
    );
  } catch (e) {
    console.log('Error querying embeddings: ', e);
    throw new Error(`Error querying embeddings: ${e}`);
  }
};

export { getMatchesFromEmbeddings, getMatchesFromEmbeddingsForDocumentType };
