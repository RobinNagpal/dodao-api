import { DiscourseThread } from '@/helpers/loaders/discourse/models';
import { Browser } from 'puppeteer';

export interface Comment {
  [x: string]: string;

  replyFullContent: string;
  author: string;
  date: string;
}

export async function getDiscoursePostWithComments(browser: Browser, url: string): Promise<DiscourseThread> {
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  // const comments: Comment[] = [];

  const contentElement = await page.$('.regular.contents');
  const postContentFull = (await page.evaluate((element) => element!.textContent, contentElement)) as string;
  const mainAuthorElement = await page.$('.first.username a');
  const author = (mainAuthorElement ? await page.evaluate((element) => element.textContent, mainAuthorElement) : '') as string;

  const mainDateElement = await page.$('.post-date [data-time]');
  const date = (mainDateElement ? await page.evaluate((element) => element.getAttribute('title'), mainDateElement) : '') as string;
  // await scrollAndCaptureComments(page);
  // Scrape comments
  const commentElements = await page.$$('.topic-post.clearfix.regular');
  const comments: Comment[] = [];

  for (let i = 1; i < commentElements.length; i++) {
    const commentElement = commentElements[i];

    const authorElement = await commentElement.$('.first.username a');
    const author = (await page.evaluate((element) => element!.textContent, authorElement)) as string;

    const dateElement = await commentElement.$('.post-date [data-time]');
    console.log(dateElement);
    // console.log(typeof dateElement);
    const date = (await page.evaluate((element) => element!.getAttribute('title'), dateElement)) as string;

    const contentElement = await commentElement.$('.cooked');
    const replyFullContent = (await page.evaluate((element) => element!.textContent, contentElement)) as string;

    comments.push({
      replyFullContent,
      author,
      date,
      // dateElement
    });
  }

  await page.close();

  return {
    url,
    postContentFull,
    author,
    // dateElement,
    date,
    comments,
  };
}
