import { createPage, getContentsOfPage, launchBrowser, waitTillHTMLRendered } from '@/helpers/puppeteer/launchBrowser';

export async function getContentsFromArticle(url: string): Promise<string> {
  const browser = await launchBrowser();
  const page = await createPage(browser);
  try {
    console.log('getContentsFromArticle', url);

    await page.goto(url, { waitUntil: 'load', timeout: 10000 });
    await waitTillHTMLRendered(page);

    const contentsOnPage = await getContentsOfPage(page, url);

    return contentsOnPage;
  } catch (error) {
    console.error(error);
    return `GOT ERROR ${error}`;
  } finally {
    await browser.close();
  }
}
