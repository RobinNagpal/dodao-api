import { createPage, getContentsOfPage, launchBrowser, waitTillHTMLRendered } from '@/helpers/puppeteer/launchBrowser';
import { Page } from 'puppeteer';

async function getContentsFromArticle(page: Page, url: string, indexInPinecone: (content: { url: string; text: string }) => Promise<void>): Promise<void> {
  console.log('getContentsFromArticle', url);

  await page.goto(url, { waitUntil: 'load', timeout: 10000 });
  await waitTillHTMLRendered(page);

  const contentsOnPage = await getContentsOfPage(page, url);

  await indexInPinecone({ url, text: contentsOnPage });
}

export async function scrapeArticleUsingPuppeteer(url: string, indexInPinecone: (content: { url: string; text: string }) => Promise<void>): Promise<void> {
  const browser = await launchBrowser();
  const page = await createPage(browser);

  try {
    await getContentsFromArticle(page, url, indexInPinecone);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}
