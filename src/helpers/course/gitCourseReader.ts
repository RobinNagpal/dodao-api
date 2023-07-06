import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { prisma } from '@/prisma';
import { GitCourse, Space } from '@prisma/client';
import fs from 'fs';
import { logError } from '@/helpers/adapters/errorLogger';
import { getCourseFromGitUrl } from '@/helpers/course/getCourseFromGitUrl';
import { getCourseRepoInfo } from '@/helpers/course/getCourseHelper';
import { ensureDirectoryExistence } from '@/helpers/git/ensureDirectoryExistence';
import { pullLatest } from '@/helpers/git/pullLatest';
import { getRedisValue, setRedisValue } from '@/helpers/redis';
import { clone, listRemotes } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

export const getRedisKeyForCourse = (spaceId: string, courseKey: string): string => `${spaceId}__${courseKey}`;

export async function setCoursesInRedis(spaceId: string, gitCourseModel: GitCourseModel) {
  const courseKey = getRedisKeyForCourse(spaceId, gitCourseModel.key);
  await setRedisValue(courseKey, JSON.stringify(gitCourseModel));
}

export async function ensureRepositoryIsAlreadyCloned(spaceId: string, courseRepoUrl: string) {
  const { parentDirectory, repositoryPath } = getCourseRepoInfo(spaceId, courseRepoUrl);
  ensureDirectoryExistence(parentDirectory);

  if (!fs.existsSync(repositoryPath)) {
    await clone({
      fs,
      http,
      dir: repositoryPath,
      url: courseRepoUrl,
      onAuth: () => ({ username: process.env.GITHUB_TOKEN }),
    });
  }

  const remotes = await listRemotes({ fs, dir: repositoryPath });

  if (remotes.pop()?.url !== courseRepoUrl) {
    throw new Error('Not the same repo');
  }
}

export async function getGitCourseFromRepository(space: Space, courseRepoUrl: string): Promise<GitCourseModel> {
  try {
    await ensureRepositoryIsAlreadyCloned(space.id, courseRepoUrl);
  } catch (e) {
    console.error(e);
    await logError('Got error in - ensureRepositoryIsAlreadyCloned', {}, e as Error, space.id, null);
  }
  const repoInfo = getCourseRepoInfo(space.id, courseRepoUrl);
  const courseJsonFile = repoInfo.repositoryPath + '/generated/course.json';

  return JSON.parse(fs.readFileSync(courseJsonFile, 'utf8'));
}

export async function readGitCourse(space: Space, rawGitCourseModel: { courseRepoUrl?: string | null }): Promise<GitCourseModel> {
  let courseModel: GitCourseModel | undefined;
  if (rawGitCourseModel.courseRepoUrl) {
    console.log(`load course from git repo - ${rawGitCourseModel.courseRepoUrl} - ${rawGitCourseModel.courseRepoUrl}`);
    courseModel = await getGitCourseFromRepository(space, rawGitCourseModel.courseRepoUrl);
  }

  if (courseModel) {
    return {
      ...courseModel,
      uuid: courseModel.key,
    };
  }

  throw new Error(`Not a valid condition ${JSON.stringify(rawGitCourseModel)}`);
}

export async function pullGitCourseAndSetInRedis(
  space: Space,
  rawGitCourseModel: { courseJsonUrl?: string | null; courseRepoUrl?: string | null },
): Promise<GitCourseModel> {
  if (rawGitCourseModel.courseRepoUrl) {
    const repoInfo = getCourseRepoInfo(space.id, rawGitCourseModel.courseRepoUrl);
    await ensureRepositoryIsAlreadyCloned(space.id, rawGitCourseModel.courseRepoUrl);
    await pullLatest(space, repoInfo.repositoryPath);
  }
  const courseModel = await readGitCourse(space, rawGitCourseModel);
  await setCoursesInRedis(space.id, courseModel);
  return courseModel;
}

export async function pullAllCoursesForSpace(space: Space) {
  const rawGitCourseModels = await prisma.gitCourse.findMany({ where: { spaceId: space.id } });
  for (const rawGitCourseModel of rawGitCourseModels) {
    try {
      await pullGitCourseAndSetInRedis(space, rawGitCourseModel);
    } catch (e) {
      console.error(e);
      await logError(`Failed loading course of - ${space.name} - ${rawGitCourseModel.courseKey}`, {}, e as Error, space.id, null);
    }
  }
}

export async function getGitCourseFromRedis(spaceId: string, courseKey: string): Promise<GitCourseModel | undefined> {
  const redisKeyForCourse = getRedisKeyForCourse(spaceId, courseKey);
  const courseString = await getRedisValue(redisKeyForCourse);
  if (!courseString) {
    await prisma.gitCourse.findUnique({ where: { spaceId_courseKey: { spaceId, courseKey } } });
  }

  return courseString ? JSON.parse(courseString) : undefined;
}

export async function doGetGitCourseFromRedis(spaceId: string, courseKey: string): Promise<GitCourseModel> {
  const courseFromRedis = await getGitCourseFromRedis(spaceId, courseKey);
  if (!courseFromRedis) {
    throw new Error(`No course set in redis  - ${spaceId} -  ${courseKey}`);
  }

  return courseFromRedis;
}
export async function getAllGitGitCoursesForSpace(
  space: Space,
  publishStatuses: PublishStatus[] = [PublishStatus.Live, PublishStatus.Draft],
): Promise<GitCourseModel[]> {
  const spaceId: string = space.id;
  console.log(`read courses for space ${spaceId}`);
  const gitCourses: GitCourseModel[] = [];
  const rawGitCourseModels = await prisma.gitCourse.findMany({ where: { spaceId } });

  const filteredCourses: GitCourse[] = (rawGitCourseModels || []).filter((course: GitCourse) =>
    publishStatuses.includes(course.publishStatus as PublishStatus),
  );

  for (const course of filteredCourses) {
    console.log(`read courses from redis - ${spaceId} - ${course.courseKey} `);
    const courseModel = await getGitCourseFromRedis(spaceId, course.courseKey);
    if (courseModel) {
      console.log(`course found in redis - ${spaceId} - ${course.courseKey} `);
      gitCourses.push(courseModel);
    } else {
      const courseModel = await pullGitCourseAndSetInRedis(space, course);
      gitCourses.push(courseModel);
    }
  }

  return gitCourses;
}

export async function loadAllGitCourses() {
  const rawGitCourses = await prisma.gitCourse.findMany();
  console.log('load courses ', rawGitCourses.length);
  for (const rawGitCourse of rawGitCourses) {
    const space = await prisma.space.findUnique({ where: { id: rawGitCourse.spaceId } });
    if (space) {
      await pullGitCourseAndSetInRedis(space, rawGitCourse);
    }
  }
}
