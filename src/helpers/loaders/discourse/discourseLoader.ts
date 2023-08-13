import { autoScroll } from '@/helpers/loaders/discourse/autoScroll';
import { getFilteredPostHrefs, PostInfo } from '@/helpers/loaders/discourse/discoursePost';
import { Comment, getDiscoursePostWithComments } from '@/helpers/loaders/discourse/getDiscoursePostWithComments';
import { DiscourseIndexRunWithPosts, DiscoursePost, DiscourseThread } from '@/helpers/loaders/discourse/models';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { v4 } from 'uuid';

const prisma = new PrismaClient();

async function checkIfExists(url: string): Promise<DiscourseIndexRunWithPosts | null> {
  return (await prisma.discourseIndexRun.findUnique({
    where: { url: url },
    // include: { posts: { include: { comments: true } } },
  })) as DiscourseIndexRunWithPosts | null;
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

  const lastRunTime = lastRunDate.getTime();
  const hrefs: PostInfo[] = await getFilteredPostHrefs(
    page,

    lastRunTime,
  );

  const allPageContents: DiscourseThread[] = [];
  const limitedHrefs = hrefs.slice(0, 5);

  console.log('limitedHrefs: ', limitedHrefs.join('\n'));
  console.log('limitedHrefs length: ', limitedHrefs.length);

  //   console.log('epoch times: ', epochTimes.join('\n'));

  for (const url of limitedHrefs) {
    const existingPost = await checkIfExists(url.href!);
    const threadDetails = await getDiscoursePostWithComments(browser, url.href!);
    if (!existingPost) {
      // If the post doesn't exist, and is newer than the last run date, store it.
      if (new Date(threadDetails.date) > (lastRunDate || new Date(0))) {
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
              create: newComments.map((comment: any) => ({
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
