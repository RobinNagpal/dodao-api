import fs from 'fs';
import puppeteer, { Browser, Page } from 'puppeteer';
import unionBy from 'lodash/unionBy';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Comment {
  [x: string]: string;
  replyFullContent: string;
  author: string;
  date: string;
}

export interface DiscoursePost {
  [x: string]: any;
  source: string;
  url: string;
  fullContent: string;
  author: string;
  datePublished: string;
  comments: Comment[];
}

export interface DiscourseThread {
  url: string;
  postContentFull: string;
  author: string;
  // dateElement: any;
  date: string;
  comments: Comment[];
}

export interface DiscourseIndexRunWithPosts {
  id: number;
  url: string;
  runDate: Date;
  posts: DiscoursePost[];
}

async function checkIfExists(url: string): Promise<DiscourseIndexRunWithPosts | null> {
  return (await prisma.discourseIndexRun.findUnique({
    where: { url: url },
    // include: { posts: { include: { comments: true } } },
  })) as DiscourseIndexRunWithPosts | null;
}

async function storeToDb(threadDetails: DiscourseThread): Promise<void> {
  const run = await prisma.discourseIndexRun.create({
    data: {
      url: threadDetails.url,
      posts: {
        create: {
          url: threadDetails.url,
          fullContent: threadDetails.postContentFull,
          author: threadDetails.author,
          datePublished: new Date(threadDetails.date),
          comments: {
            create: threadDetails.comments.map((comment) => ({
              content: comment.replyFullContent,
              author: comment.author,
              date: new Date(comment.date),
            })),
          },
        },
      },
    },
  });
}

async function getLastRunDate(): Promise<Date> {
  const lastRun = await prisma.discourseIndexRun.findFirst({
    orderBy: {
      runDate: 'desc',
    },
    select: {
      runDate: true,
    },
  });
  console.log(lastRun);
  return lastRun?.runDate || new Date(0);
}

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

export async function scrollAndCapture(page: Page): Promise<Comment[]> {
  const commentWithDuplicates = await page.evaluate(() => {
    return new Promise<Comment[]>((resolve) => {
      const allComments: Comment[] = [];
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const comments = document.querySelectorAll('.topic-post.clearfix.regular');
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        for (let i = 0; i < comments.length; i++) {
          const comment = comments[i];
          const fullContentElement = comment.querySelector('.cooked');
          const fullContent = fullContentElement ? fullContentElement.textContent : '';

          const authorElement = comment.querySelector('.first.username a');
          const author = authorElement ? authorElement.textContent : '';

          const dateElement = comment.querySelector('.post-date [data-time]');
          const date = dateElement ? dateElement.textContent : '';

          allComments.push({
            author: author || '',
            date: date || '',
            replyFullContent: fullContent || '',
          });
        }

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve(allComments);
        }
      }, 300);
    });
  });
  unionBy(commentWithDuplicates, 'replyFullContent');
  return commentWithDuplicates;
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
  await scrollAndCapture(page);
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

// async function getHrefs(page: Page, selector: string): Promise<string[]> {
//   return (await page.$$eval(selector, (anchors) => [].map.call(anchors, (a: HTMLAnchorElement) => a.href))) as string[];
// }

async function getAllPosts(discourseUrl: string): Promise<DiscourseThread[]> {
  console.log('Came to getAllthreads Function');

  const lastRunDate = await getLastRunDate();
  //   const lastRunTime = lastRunDate?.getTime() || new Date(0).getTime();

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(discourseUrl);
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await autoScroll(page, 600);

  async function getFilteredHrefs(page: Page, topicSelector: string, hrefSubSelector: string, timeSubSelector: string, lastRunTime: number): Promise<string[]> {
    return await page.$$eval(
      topicSelector,
      (topics, hrefSubSelector, timeSubSelector, lastRunTime) => {
        const validHrefs: string[] = [];

        topics.forEach((topic: Element) => {
          const timeElement = topic.querySelector(timeSubSelector);
          const dataTimeAttr = timeElement ? (timeElement as HTMLElement).getAttribute('data-time') : null;
          const epochTime = dataTimeAttr ? parseInt(dataTimeAttr) : null;

          if (epochTime && epochTime >= lastRunTime) {
            const hrefElement = topic.querySelector(hrefSubSelector) as HTMLAnchorElement | null;
            if (hrefElement && hrefElement.href) {
              validHrefs.push(hrefElement.href);
            }
          }
        });

        return validHrefs;
      },
      hrefSubSelector,
      timeSubSelector,
      lastRunTime,
    );
  }

  const lastRunTime = lastRunDate.getTime();
  const hrefs: string[] = await getFilteredHrefs(
    page,
    'tr.topic-list-item',
    'td.main-link > span > a',
    'td.topic-list-data > a > span[data-time]',
    lastRunTime,
  );

  const allPageContents: DiscourseThread[] = [];
  const limitedHrefs = hrefs.slice(0, 5);

  console.log('limitedHrefs: ', limitedHrefs.join('\n'));
  console.log('limitedHrefs length: ', limitedHrefs.length);

  //   console.log('epoch times: ', epochTimes.join('\n'));

  for (const url of limitedHrefs) {
    const existingPost = await checkIfExists(url);
    const threadDetails = await getDiscoursePostWithComments(browser, url);
    if (!existingPost) {
      // If the post doesn't exist, and is newer than the last run date, store it.
      if (new Date(threadDetails.date) > (lastRunDate || new Date(0))) {
        await storeToDb(threadDetails);
      }
    } else {
      // Handle updating the post if new comments are found.
      const existingComments = existingPost.posts[0].comments;
      const newComments = threadDetails.comments.filter(
        (comment: Comment) => !existingComments.some((existingComment) => existingComment.content === comment.replyFullContent),
      );

      if (newComments.length) {
        // Add the new comments to the post.
        await prisma.discoursePost.update({
          where: { id: existingPost.posts[0].id },
          data: {
            comments: {
              create: newComments.map((comment) => ({
                content: comment.replyFullContent,
                author: comment.author,
                date: new Date(comment.date),
              })),
            },
          },
        });
      }
    }
  }

  await browser.close();

  return allPageContents;
}

async function getAllDiscourseDocs(discourseUrl: string): Promise<DiscoursePost[]> {
  const allPageContents = await getAllPosts(discourseUrl);
  console.log('All Page Contents Length:', allPageContents.length);
  console.log('All Page Contents URLs:', allPageContents.map((c) => c.url).join('\n'));
  console.log('The Code Started ');
  const docs: DiscoursePost[] = allPageContents.map(
    (threadDetails: DiscourseThread): DiscoursePost => ({
      source: threadDetails.url,
      url: threadDetails.url,
      fullContent: threadDetails.postContentFull,
      author: threadDetails.author,
      datePublished: threadDetails.date,
      comments: threadDetails.comments.map((comment) => ({
        replyFullContent: comment.replyFullContent,
        author: comment.author,
        date: comment.date,
      })),
    }),
  );
  return docs;
}

getAllDiscourseDocs('https://gov.uniswap.org/latest')
  .then((result) => {
    fs.writeFileSync('output.json', JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error(error);
  });
