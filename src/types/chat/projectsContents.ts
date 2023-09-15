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
  chunk: string;
  fullContent?: string;
  url: string;
  source?: string;
  text?: string;
}

export enum DocumentInfoType {
  ARTICLE = 'ARTICLE',
  GITBOOK = 'GITBOOK',
  GITHUB = 'GITHUB',
  DISCORD = 'DISCORD',
  DISCOURSE_POST = 'DISCOURSE_POST',
  DISCOURSE_COMMENT = 'DISCOURSE_COMMENT',
}
