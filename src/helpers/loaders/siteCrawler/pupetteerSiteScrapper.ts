import { createPage, getContentsOfPage, launchBrowser, waitTillHTMLRendered } from '@/helpers/puppeteer/launchBrowser';
import { Page } from 'puppeteer';

async function getContentsRecursivelyFromLink(
  page: Page,
  baseUrl: string,
  url: string,
  collector: string[],
  ignoreHash: boolean,
  ignoreQueryParams: boolean,
  indexInPinecone: (content: { url: string; text: string }) => Promise<void>,
): Promise<void> {
  let comparableLink: string = url;
  if (ignoreHash || ignoreQueryParams) {
    const urlObj = new URL(url);
    if (ignoreHash) {
      urlObj.hash = ''; // remove hash part
    }
    if (ignoreQueryParams) {
      urlObj.search = ''; // remove query parameters
    }
    comparableLink = urlObj.toString();
  }

  if (collector.includes(comparableLink)) {
    console.log('Already indexed', comparableLink);
    return;
  }

  console.log(`getContentsRecursivelyFromLink ignoreHash:${ignoreHash} ignoreQueryParams:${ignoreQueryParams}`, comparableLink);

  await page.goto(url, { waitUntil: 'load', timeout: 10000 });
  await waitTillHTMLRendered(page);
  const links = await page.evaluate(() => Array.from(document.querySelectorAll('a')).map((a) => a.href));

  const filteredLinks = await filterLinksByHost(baseUrl, links);

  const contentsOnPage = await getContentsOfPage(page, url);

  collector.push(comparableLink);
  await indexInPinecone({ url: comparableLink, text: contentsOnPage });

  for (const link of filteredLinks) {
    try {
      await getContentsRecursivelyFromLink(page, baseUrl, link, collector, ignoreHash, ignoreQueryParams, indexInPinecone);
    } catch (error) {
      console.error(`Failed to fetch the content of the URL: ${link}`, error);
    }
  }
}

async function filterLinksByHost(baseUrl: string, links: string[]): Promise<string[]> {
  return links
    .filter(Boolean)
    .filter((a) => a.startsWith('https://'))
    .filter((link) => {
      try {
        return link.startsWith(baseUrl);
      } catch (e) {
        console.log('filterLinksByHost - Failed to parse URL', link);
        return false;
      }
    });
}

export async function scrapeUsingPuppeteer(
  baseUrl: string,
  startUrl: string,
  ignoreHash: boolean,
  ignoreQueryParams: boolean,
  indexInPinecone: (content: { url: string; text: string }) => Promise<void>,
): Promise<void> {
  const browser = await launchBrowser();
  const page = await createPage(browser);

  try {
    await getContentsRecursivelyFromLink(page, baseUrl, startUrl, [], ignoreHash, ignoreQueryParams, indexInPinecone);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}

// scrapeUsingPuppeteer('docs.compound.finance', 'https://docs.compound.finance', true);
