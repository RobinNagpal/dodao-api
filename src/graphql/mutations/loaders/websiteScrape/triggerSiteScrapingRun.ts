import { MutationTriggerSiteScrapingRunArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { scrapeUsingPuppeteer } from '@/helpers/loaders/siteCrawler/pupetteerSiteScrapper';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { indexDocsInPinecone } from '@/helpers/vectorIndexers/indexDocsInPinecone';
import { initPineconeClient } from '@/helpers/vectorIndexers/pineconeHelper';
import { split } from '@/helpers/vectorIndexers/splitter';
import { prisma } from '@/prisma';
import { PageMetadata } from '@/types/chat/projectsContents';
import { SiteScrapingRun, WebsiteScrapingInfo } from '@prisma/client';
import { IncomingMessage } from 'http';
import { Document as LGCDocument } from 'langchain/document';
import { v4 } from 'uuid';

async function scrapeWebsiteUsingPuppeteer(websiteScrappingInfo: WebsiteScrapingInfo, newRun: SiteScrapingRun) {
  const contents = await scrapeUsingPuppeteer(websiteScrappingInfo.host, websiteScrappingInfo.scrapingStartUrl, websiteScrappingInfo.ignoreHashInUrl);

  for (const content of contents) {
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

    const splitDocs = await split([fullDoc]);
    const index = await initPineconeClient();
    await indexDocsInPinecone(splitDocs, index, websiteScrappingInfo.spaceId);
  }

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
  scrapeWebsiteUsingPuppeteer(websiteScrappingInfo, newRun);

  return newRun;
}