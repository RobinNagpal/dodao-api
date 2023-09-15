import { getPostDetails, storePostDetails } from '@/helpers/loaders/discourse/discoursePostDetails';
import { prisma } from '@/prisma';
import puppeteer from 'puppeteer';

export async function indexDiscoursePostInDB(spaceId: string, postId: string): Promise<void> {
  const discoursePost = await prisma.discoursePost.findFirstOrThrow({
    where: {
      id: postId,
    },
  });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(discoursePost.url);
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  const postTopics = await getPostDetails(page, discoursePost);
  await storePostDetails(discoursePost, postTopics);

  await browser.close();
}
