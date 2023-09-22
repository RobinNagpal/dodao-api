import { createPage, getContentsOfPage, launchBrowser, waitTillHTMLRendered } from '@/helpers/puppeteer/launchBrowser';
import { Page } from 'puppeteer';

async function getContentsRecursivelyFromLink(
  page: Page,
  host: string,
  url: string,
  collector: string[],
  ignoreHash: boolean,
  indexInPinecone: (content: { url: string; text: string }) => Promise<void>,
): Promise<void> {
  let comparableLink: string = url;
  if (ignoreHash) {
    const urlObj = new URL(url);
    urlObj.hash = ''; // remove hash part
    comparableLink = urlObj.toString();
  }

  if (collector.includes(comparableLink)) {
    console.log('Already indexed', comparableLink);
    return;
  }

  console.log('getContentsRecursivelyFromLink', url);

  await page.goto(url, { waitUntil: 'load', timeout: 10000 });
  await waitTillHTMLRendered(page);
  const links = await page.evaluate(() => Array.from(document.querySelectorAll('a')).map((a) => a.href));

  const filteredLinks = await filterLinksByHost(host, links);

  const contentsOnPage = await getContentsOfPage(page, url);

  collector.push(comparableLink);
  await indexInPinecone({ url: comparableLink, text: contentsOnPage });

  for (const link of filteredLinks) {
    try {
      await getContentsRecursivelyFromLink(page, host, link, collector, ignoreHash, indexInPinecone);
    } catch (error) {
      console.error(`Failed to fetch the content of the URL: ${link}`, error);
    }
  }
}

async function filterLinksByHost(host: string, links: string[]): Promise<string[]> {
  return links.filter((link) => new URL(link).host === host);
}

export async function scrapeUsingPuppeteer(
  host: string,
  startUrl: string,
  ignoreHash: boolean,
  indexInPinecone: (content: { url: string; text: string }) => Promise<void>,
): Promise<void> {
  const browser = await launchBrowser();
  const page = await createPage(browser);

  try {
    await getContentsRecursivelyFromLink(page, host, startUrl, [], ignoreHash, indexInPinecone);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}

// scrapeUsingPuppeteer('docs.compound.finance', 'https://docs.compound.finance', true);
