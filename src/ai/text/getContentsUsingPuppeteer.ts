import puppeteer from 'puppeteer';

export default async function getContentsUsingPuppeteer(url: string): Promise<string> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    const elements: Element[] = Array.from(document.querySelectorAll('body title, body h1, body h2, body p, body div'));

    return elements
      .map((element) => ({
        tagName: element.tagName.toLowerCase(),
        text: (element as HTMLElement)?.innerText?.trim() || '',
      }))
      .filter((item) => item.text !== '')
      .map((item) => item.text);
  });

  await browser.close();

  return data?.join(' ') || '';
}
