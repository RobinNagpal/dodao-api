import { MutationTriggerSiteScrapingRunArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { scrapeUsingPuppeteer } from '@/helpers/loaders/siteCrawler/pupetteerSiteScrapper';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { deleteDocWithUrlInPinecone, indexDocsInPinecone } from '@/helpers/vectorIndexers/indexDocsInPinecone';
import { initPineconeClient } from '@/helpers/vectorIndexers/pineconeHelper';
import { split, splitFullContent } from '@/helpers/vectorIndexers/splitter';
import { prisma } from '@/prisma';
import { PageMetadata } from '@/types/chat/projectsContents';
import { SiteScrapingRun, WebsiteScrapingInfo } from '@prisma/client';
import { IncomingMessage } from 'http';
import { Document as LGCDocument } from 'langchain/document';
import { v4 } from 'uuid';

async function scrapeWebsiteUsingPuppeteer(websiteScrappingInfo: WebsiteScrapingInfo, newRun: SiteScrapingRun) {
  const indexInPinecone = async (content: { url: string; text: string }) => {
    await prisma.scrapedUrlInfo.create({
      data: {
        id: v4(),
        spaceId: websiteScrappingInfo.spaceId,
        websiteScrapingInfoId: websiteScrappingInfo.id,
        url: content.url,
        text: content.text,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const url = content.url;
    const metadata: Omit<PageMetadata, 'chunk'> = {
      url: url,
      fullContent: content.text,
      source: url,
    };

    const fullDoc: LGCDocument<Omit<PageMetadata, 'chunk'>> = {
      pageContent: content.text,
      metadata,
    };
    const index = await initPineconeClient();
    await deleteDocWithUrlInPinecone(url, index, websiteScrappingInfo.spaceId);

    if ((fullDoc?.metadata?.fullContent?.length || 0) > 100 * 1024) {
      console.log('Skipping indexing of ', url, ' because it is too big');
      // too big to index
      return;
    }

    const fullContentSplits = splitFullContent(fullDoc);
    const splitDocs = await split(fullContentSplits);

    await indexDocsInPinecone(splitDocs, index, websiteScrappingInfo.spaceId);

    await prisma.scrapedUrlInfo.upsert({
      where: {
        url_websiteScrapingInfoId: {
          url: content.url,
          websiteScrapingInfoId: websiteScrappingInfo.id,
        },
      },
      create: {
        id: v4(),
        spaceId: websiteScrappingInfo.spaceId,
        websiteScrapingInfoId: websiteScrappingInfo.id,
        url: content.url,
        text: content.text,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        text: content.text,
        updatedAt: new Date(),
      },
    });
  };

  await scrapeUsingPuppeteer(
    websiteScrappingInfo.baseUrl,
    websiteScrappingInfo.scrapingStartUrl,
    websiteScrappingInfo.ignoreHashInUrl,
    websiteScrappingInfo.ignoreQueryParams,
    indexInPinecone,
  );

  await prisma.siteScrapingRun.update({
    where: {
      id: newRun.id,
    },
    data: {
      status: 'SUCCESS',
    },
  });
}

export default async function triggerSiteScrapingRun(_: any, args: MutationTriggerSiteScrapingRunArgs, context: IncomingMessage) {
  const space = await getSpaceById(args.spaceId);
  checkEditSpacePermission(space, context);

  const websiteScrappingInfo = await prisma.websiteScrapingInfo.findFirstOrThrow({
    where: {
      id: args.websiteScrapingInfoId,
    },
  });

  const newRun = await prisma.siteScrapingRun.create({
    data: {
      id: v4(),
      websiteScrapingInfoId: args.websiteScrapingInfoId,
      spaceId: args.spaceId,
      status: 'IN_PROGRESS',
      createdAt: new Date(),
      updatedAt: new Date(),
      scrapingRunDate: new Date(),
    },
  });
  await prisma.scrapedUrlInfo.deleteMany({
    where: {
      websiteScrapingInfoId: args.websiteScrapingInfoId,
    },
  });
  scrapeWebsiteUsingPuppeteer(websiteScrappingInfo, newRun);

  return newRun;
}
