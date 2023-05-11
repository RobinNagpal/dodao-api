import { GitCourseTopicModel } from '@/deprecatedSchemas/models/course/CourseTopics';
import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { GuideModel } from '@/deprecatedSchemas/models/GuideModel';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';
import { Request, Response } from 'express';
import { getAllGitGitCoursesForSpace } from '@/helpers/course/gitCourseReader';
import { getAllGuidesWithSteps } from '@/helpers/guides/getAllGuidesWithSteps';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';

let sitemap: Record<string, Buffer> = {} as Record<string, Buffer>;

type ChangeFrequency = 'weekly' | 'daily';

interface SiteMapUrl {
  url: string;
  changefreq: string;
  priority?: number;
}

async function getGuideUrlsForAcademy(spaceId: string): Promise<SiteMapUrl[]> {
  const allGuides: GuideModel[] = await getAllGuidesWithSteps(spaceId, [PublishStatus.Live]);
  const urls: SiteMapUrl[] = [];
  for (const guide of allGuides) {
    guide.steps.forEach((_, index) => {
      const sitemapUrl = {
        url: `/guide/view/${guide.uuid}/${index}`,
        changefreq: 'weekly',
      };
      urls.push(sitemapUrl);
    });
  }
  return urls;
}

export async function getCourseUrlsForAcademy(spaceId: string): Promise<SiteMapUrl[]> {
  const space: Space = await prisma.space.findUniqueOrThrow({ where: { id: spaceId } });

  const gitCourses = await getAllGitGitCoursesForSpace(space, [PublishStatus.Live]);

  const urls: SiteMapUrl[] = [];
  (gitCourses || []).forEach((course: GitCourseModel) => {
    urls.push({ url: `/course/file/view/${course.key}`, changefreq: 'weekly' });

    course.topics.forEach((topic: GitCourseTopicModel) => {
      urls.push({ url: `/course/file/view/${course.key}/${topic.key}`, changefreq: 'weekly' });

      (topic.explanations || []).forEach((explanation) => {
        urls.push({
          url: `/course/file/view/${course.key}/${topic.key}/explanation/${explanation.key}`,
          changefreq: 'weekly',
        });
      });

      (topic.summaries || []).forEach((summary) => {
        urls.push({
          url: `/course/file/view/${course.key}/${topic.key}/summary/${summary.key}`,
          changefreq: 'weekly',
        });
      });

      (topic.readings || []).forEach((reading) => {
        urls.push({
          url: `/course/file/view/${course.key}/${topic.key}/reading/${reading.uuid}`,
          changefreq: 'weekly',
        });
      });
    });
  });
  return urls;
}

async function writeUrlsToStream(host: string, smStream: SitemapStream) {
  let spaceId;
  if (host === 'aave.academy') {
    spaceId = 'aave-eth-1';
  }
  if (host === 'dodao.academy') {
    spaceId = 'dodao-academy-eth-1';
  }

  if (spaceId) {
    const guideUrls = await getGuideUrlsForAcademy(spaceId);

    for (const guideUrl of guideUrls) {
      smStream.write(guideUrl);
    }

    const courseUrls = await getCourseUrlsForAcademy(spaceId);

    for (const courseUrl of courseUrls) {
      smStream.write(courseUrl);
    }
  } else {
    smStream.write({ url: 'https://dodao.academy' });
  }
}

export async function sitemapGenerator(req: Request, res: Response) {
  const host: string = req.header('host')!;
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  // if we have a cached entry send it
  if (sitemap[host]) {
    res.send(sitemap[host]);
    return;
  }

  try {
    const smStream = new SitemapStream({ hostname: 'https://' + host });
    const pipeline = smStream.pipe(createGzip());

    // pipe your entries or directly write them.
    await writeUrlsToStream(host, smStream);

    /* or use
    Readable.from([{url: '/page-1'}...]).pipe(smStream)
    if you are looking to avoid writing your own loop.
    */

    // cache the response
    streamToPromise(pipeline).then((sm) => {
      sitemap = {
        ...sitemap,
        host: sm,
      };
    });
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end();
    // stream write the response
    pipeline.pipe(res).on('error', (e) => {
      throw e;
    });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}
