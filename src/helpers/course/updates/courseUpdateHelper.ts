import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { GitRepoCourse, GitRepoCourseTopic } from '@/deprecatedSchemas/models/course/GitRepoCourse';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';
import fs from 'fs';
import { CourseRepoInfo, getCourseRepoInfo } from '@/helpers/course/getCourseHelper';
import { doGetGitCourseFromRedis, getGitCourseFromRepository, setCoursesInRedis } from '@/helpers/course/gitCourseReader';
import { writeToFile } from '@/helpers/fileWriter';
import { getAuthor } from '@/helpers/getAuthor';
import { add, commit, push } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import yaml from 'js-yaml';

interface CourseAndRepoInfo {
  courseFromRepository: GitCourseModel;
  repoInfo: CourseRepoInfo;
}

export async function addCommitAndPush(accountId: string, repositoryPath: string, message: string) {
  await add({
    fs,
    dir: repositoryPath,
    filepath: '.',
  });
  await commit({
    fs,
    dir: repositoryPath,
    author: getAuthor(accountId),
    message: message,
  });

  const pushResult = await push({
    fs,
    http,
    dir: repositoryPath,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({ username: process.env.GITHUB_TOKEN }),
  });
  console.log('pushResult', pushResult);
}

export async function getCourseAndRepoInfo(space: Space, courseKey: string): Promise<CourseAndRepoInfo> {
  const spaceId = space.id;

  const rawCourse = await prisma.gitCourse.findUnique({ where: { spaceId_courseKey: { spaceId: space.id, courseKey } } });
  if (!rawCourse) {
    throw new Error(`No course found - ${spaceId} -  ${courseKey}`);
  }
  const courseRepoUrl = rawCourse.courseRepoUrl;

  if (!courseRepoUrl) {
    throw new Error(`No course repo url set - ${spaceId} -  ${courseKey}`);
  }

  const repoInfo = getCourseRepoInfo(spaceId, courseRepoUrl);

  const courseFromRepository = await getGitCourseFromRepository(space, courseRepoUrl);
  return { courseFromRepository, repoInfo };
}

export async function updateCourseFile(repoInfo: CourseRepoInfo, updatedCourse: GitCourseModel) {
  const courseJsonFile = repoInfo.repositoryPath + '/generated/course.json';

  await writeToFile(courseJsonFile, JSON.stringify(updatedCourse, null, 2));
}

export function getTopicInCourseFile(repoInfo: CourseRepoInfo, courseKey: string, topicKey: string): GitRepoCourseTopic {
  const courseYamlFile = repoInfo.repositoryPath + '/src/course.yaml';
  const courseYaml = yaml.load(fs.readFileSync(courseYamlFile, 'utf8')) as GitRepoCourse;
  const topicInCourseFile = courseYaml.topics.find((topic) => topic.key === topicKey);

  if (!topicInCourseFile) {
    throw new Error(`Topic with key - ${topicKey} of course ${courseKey} not found`);
  }
  return topicInCourseFile;
}

export async function commitAndPushUpdatedCourse(input: {
  spaceId: string;
  courseKey: string;
  updatedCourse: GitCourseModel;
  accountId: string;
  repoInfo: CourseRepoInfo;
}) {
  await addCommitAndPush(input.accountId, input.repoInfo.repositoryPath, `Course Basic Info Updated by ${input.accountId}`);

  await setCoursesInRedis(input.spaceId, input.updatedCourse);

  return doGetGitCourseFromRedis(input.spaceId, input.courseKey);
}
