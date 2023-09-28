import { getContentsFromArticle } from '@/helpers/loaders/articleScraper/pupetteerArticleScrapper';
import { deleteDocWithUrlInPinecone, indexDocsInPinecone } from '@/helpers/vectorIndexers/indexDocsInPinecone';
import { initPineconeClient } from '@/helpers/vectorIndexers/pineconeHelper';
import { split, splitFullContent } from '@/helpers/vectorIndexers/splitter';
import { prisma } from '@/prisma';
import { PageMetadata } from '@/types/chat/projectsContents';
import { ArticleIndexingInfo } from '@prisma/client';
import { Document as LGCDocument } from 'langchain/dist/document';

export async function indexArticleIndexingInfo(info: ArticleIndexingInfo) {
  const url = info.articleUrl;
  const text = await getContentsFromArticle(url);
  const metadata: Omit<PageMetadata, 'chunk'> = {
    url: url,
    fullContent: text,
    source: url,
  };

  const fullDoc: LGCDocument<Omit<PageMetadata, 'chunk'>> = {
    pageContent: text,
    metadata,
  };
  const index = await initPineconeClient();
  await deleteDocWithUrlInPinecone(url, index, info.spaceId);

  console.log('Text', text);

  if ((fullDoc?.metadata?.fullContent?.length || 0) > 100 * 1024) {
    console.log('Skipping indexing of ', url, ' because it is too big');
    // too big to index
    return;
  }

  const fullContentSplits = splitFullContent(fullDoc);
  const splitDocs = await split(fullContentSplits);

  await indexDocsInPinecone(splitDocs, index, info.spaceId);

  const articleIndexingInfo = await prisma.articleIndexingInfo.update({
    where: {
      id: info.id,
    },
    data: {
      text,
      updatedAt: new Date(),
      status: 'INDEXED',
    },
  });

  return articleIndexingInfo;
}
