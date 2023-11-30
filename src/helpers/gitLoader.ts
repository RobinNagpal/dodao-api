import { loadAllAcademyWebsites } from '@/helpers/academy/gitAcademyReader';
import { loadAllGitCourses } from '@/helpers/course/gitCourseReader';
import { setupRedis } from '@/helpers/redis';

export function setupGitLoader() {
  if ('development' !== process.env.SERVER_ENV) {
    setTimeout(() => loadAllGitCourses(), 90 * 1000);

    setTimeout(() => loadAllAcademyWebsites(), 60 * 1000);
  }

  setupRedis();
}
