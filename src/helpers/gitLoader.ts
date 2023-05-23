import { loadAllAcademyWebsites } from '@/helpers/academy/gitAcademyReader';
import { loadAllGitCourses } from '@/helpers/course/gitCourseReader';
import { loadAllGitGuides } from '@/helpers/gitGuides/loadAllGitGuides';
import { setupRedis } from '@/helpers/redis';

export function setupGitLoader() {
  setTimeout(() => loadAllGitCourses(), 4e3);

  setTimeout(() => loadAllAcademyWebsites(), 5e3);

  setInterval(() => {
    loadAllGitCourses();
  }, 300e3);

  setInterval(() => {
    loadAllAcademyWebsites();
  }, 400e3);

  setInterval(() => {
    // loadAllGitGuides();
  }, 250e3);

  setupRedis();
}
