import puppeteer from 'puppeteer';

export async function setupPuppeteerPageForDiscourse(discourseUrl: string) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(discourseUrl);
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  return { browser, page };
}
