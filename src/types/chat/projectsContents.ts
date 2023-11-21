export interface Content {
  id: string;
  url: string;
  spaceId: string;
  namespace: string;
  details?: any;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  indexed: boolean;
  indexedAt: Date | null;
}

export interface PageMetadata {
  fullContentId: string;
  documentType: DocumentInfoType;
  url: string;
}

export enum DocumentInfoType {
  // When a website is scraped, we add multiple scrapped url info documents. Refer to ScrapedUrlInfo in prisma/schema.prisma
  SCRAPED_URL_INFO = 'SCRAPED_URL_INFO',

  // When a single page is scraped, we add a single page document. Refer to ArticleIndexingInfo in prisma/schema.prisma
  ARTICLE_INDEXING_INFO = 'ARTICLE_INDEXING_INFO',

  FAQ = 'FAQ',

  DISCOURSE_POST = 'DISCOURSE_POST',
  DISCOURSE_COMMENT = 'DISCOURSE_COMMENT',
}
