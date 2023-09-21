import puppeteer, { Browser, Page } from 'puppeteer';

async function launchBrowser(): Promise<Browser> {
  return await puppeteer.launch();
}

async function createPage(browser: Browser): Promise<Page> {
  return await browser.newPage();
}

async function getContentsOfPage(page: Page, link: string): Promise<string> {
  await page.goto(link, { waitUntil: 'load', timeout: 0 });
  return await page.evaluate(() => {
    let textContent = '';

    const queue = Array.from(document.body.querySelectorAll('div'));
    while (queue.length > 0) {
      const element = queue.shift();
      if (element) {
        textContent += element.innerText + '\n';
        // If you want to go deeper, uncomment the next line
        queue.push(...Array.from(element.querySelectorAll('div')));
      }
    }
    return textContent;
  });
}

// https://stackoverflow.com/a/61304202/440432
const waitTillHTMLRendered = async (page: Page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    const html = await page.content();
    const currentHTMLSize = html.length;

    await page.evaluate(() => document.body.innerHTML.length);

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) countStableSizeIterations++;
    else countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitForTimeout(checkDurationMsecs);
  }
};
async function getContentsFromLink(
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

  console.log('getContentsFromLink', url);

  await page.goto(url, { waitUntil: 'load', timeout: 10000 });
  await waitTillHTMLRendered(page);
  const links = await page.evaluate(() => Array.from(document.querySelectorAll('a')).map((a) => a.href));

  const filteredLinks = await filterLinksByHost(host, links);

  const contentsOnPage = await getContentsOfPage(page, url);

  collector.push(comparableLink);
  await indexInPinecone({ url: comparableLink, text: contentsOnPage });

  for (const link of filteredLinks) {
    try {
      await getContentsFromLink(page, host, link, collector, ignoreHash, indexInPinecone);
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
    await getContentsFromLink(page, host, startUrl, [], ignoreHash, indexInPinecone);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}

// scrapeUsingPuppeteer('docs.compound.finance', 'https://docs.compound.finance', true);
