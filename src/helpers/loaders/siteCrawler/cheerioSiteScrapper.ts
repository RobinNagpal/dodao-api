import axios from 'axios';
import { load } from 'cheerio';

const visited: { [key: string]: boolean } = {};
const pagesAndContent: Record<string, string> = {};

async function scrapeSite(baseSiteUrl: URL, currentUrl: URL) {
  const currentUrlString = currentUrl.toString().split('#')[0];
  if (Object.keys(pagesAndContent).length > 10) {
    return;
  }

  if (!currentUrlString.startsWith(baseSiteUrl.toString())) {
    console.log('currentUrlString', currentUrlString, 'baseSiteUrl', baseSiteUrl.toString());
    return;
  }

  try {
    if (visited[currentUrlString]) {
      return;
    }
    visited[currentUrlString] = true;
    const { data } = await axios.get(currentUrlString);
    const $ = load(data);

    // Get the website's text content and log it
    const bodyText = $('body').text();
    pagesAndContent[currentUrlString] = bodyText;
    console.log(`URL: ${currentUrlString}`);
    // console.log(bodyText);

    // Then find other links on the page and scrape them too
    // Then find other links on the page and scrape them too
    const links = $('a[href]').toArray();

    console.log(`links on page ${currentUrl}: `, JSON.stringify(links, null, 2));
    for (const element of links) {
      const href = $(element).attr('href')!;
      const fullUrl = new URL(href, currentUrl);
      // Only follow links within the same domain
      if (fullUrl.hash !== '') {
        continue;
      }

      if (fullUrl.origin == baseSiteUrl.origin) {
        // Wait for each page to be downloaded before moving to the next one
        await scrapeSite(baseSiteUrl, fullUrl);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export async function doScaping(baseSiteUrl = 'https://app.charmverse.io/op-grants', startUrl = 'https://app.charmverse.io/op-grants/page-701220845245208') {
  await scrapeSite(new URL(baseSiteUrl), new URL(startUrl));
  console.log(JSON.stringify(Object.keys(pagesAndContent), null, 2));
  return pagesAndContent;
}

// doScaping();
