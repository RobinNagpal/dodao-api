import puppeteer, { Browser, Page } from 'puppeteer';

export async function launchBrowser(): Promise<Browser> {
  return await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
}

export async function createPage(browser: Browser): Promise<Page> {
  return await browser.newPage();
}

async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100; // Change this value as per your need
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve(true);
        }
      }, 100); // Change the duration as per your need
    });
  });
}

// https://stackoverflow.com/a/61304202/440432
export const waitTillHTMLRendered = async (page: Page, timeout = 30000) => {
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

export async function getContentsOfPage(page: Page, link: string): Promise<string> {
  await page.goto(link, { waitUntil: 'load', timeout: 0 });

  await waitTillHTMLRendered(page, 10000);
  await autoScroll(page);
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
