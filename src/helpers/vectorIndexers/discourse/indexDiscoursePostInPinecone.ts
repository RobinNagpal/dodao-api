import { deleteDocWithUrlInPinecone, indexDocsInPinecone } from '@/helpers/vectorIndexers/indexDocsInPinecone';
import { split } from '@/helpers/vectorIndexers/splitter';
import { DocumentInfoType, PageMetadata } from '@/types/chat/projectsContents';
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';
import { DiscoursePost } from '@prisma/client';
import { Document as LGCDocument } from 'langchain/document';

export async function indexDiscoursePostInPinecone(post: DiscoursePost, index: VectorOperationsApi) {
  const metadata: PageMetadata = {
    url: post.url,
    fullContentId: post.id,
    documentType: DocumentInfoType.DISCOURSE_POST,
    enacted: !!post.enacted,
    discussed: !!post.discussed,
  };

  const pageContent = `${post.aiSummary ? post.aiSummary + '\n\n\n' : ''}${post.fullContent}`;
  const postDocument: LGCDocument<PageMetadata> = {
    pageContent: pageContent,
    metadata,
  };

  console.log(`Upserting post in pinecone  ${post.url}`);
  await deleteDocWithUrlInPinecone(metadata.url, index, post.spaceId);

  const splitDocs = await split([postDocument]);

  await indexDocsInPinecone(splitDocs, index, post.spaceId);
}
