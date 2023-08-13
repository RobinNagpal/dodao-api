import { Page } from 'puppeteer';

export async function autoScroll(page: Page, totalHeightLimit: number): Promise<void> {
  await page.evaluate((heightLimit) => {
    return new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= heightLimit) {
          clearInterval(timer);
          resolve();
        } else {
          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
            resolve();
          }
        }
      }, 300);
    });
  }, totalHeightLimit);
}
