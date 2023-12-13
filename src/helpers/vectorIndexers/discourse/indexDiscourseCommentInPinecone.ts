import { deleteDocWithUrlInPinecone, indexDocsInPinecone } from '@/helpers/vectorIndexers/indexDocsInPinecone';
import { split } from '@/helpers/vectorIndexers/splitter';
import { DocumentInfoType, PageMetadata } from '@/types/chat/projectsContents';
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';
import { DiscoursePost, DiscoursePostComment } from '@prisma/client';
import { Document as LGCDocument } from 'langchain/document';

export async function indexDiscourseCommentInPinecone(
  index: VectorOperationsApi,
  post: DiscoursePost,
  upsertedComment: DiscoursePostComment,
  commentIndex: number,
) {
  const url = `${post.url}/${commentIndex + 2}}`;

  console.log(`Upserting comment in pinecone  ${url} `);

  const metadata: PageMetadata = {
    url: url,
    fullContentId: upsertedComment.id,
    documentType: DocumentInfoType.DISCOURSE_COMMENT,
    enacted: !!post.enacted,
    discussed: !!post.discussed,
  };

  const commentDocuments: LGCDocument<PageMetadata> = {
    pageContent: upsertedComment.content,
    metadata,
  };
  await deleteDocWithUrlInPinecone(metadata.url, index, post.spaceId);

  const splitDocs = await split([commentDocuments]);

  await indexDocsInPinecone(splitDocs, index, post.spaceId);
}
