import { loadAllAcademyWebsites } from '@/helpers/academy/gitAcademyReader';
import { loadAllGitCourses } from '@/helpers/course/gitCourseReader';
import { setupRedis } from '@/helpers/redis';

export function setupGitLoader() {
  // setTimeout(() => loadAllGitCourses(), 90 * 1000);

  // setTimeout(() => loadAllAcademyWebsites(), 60 * 1000);
  /*

  setInterval(() => {
    loadAllGitCourses();
  }, 90 * 1000);

  setInterval(() => {
    loadAllAcademyWebsites();
  }, 100 * 1000);

*/

  setupRedis();
}
