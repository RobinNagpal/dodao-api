import { GitCourseTopicModel } from '@/deprecatedSchemas/models/course/CourseTopics';
import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { GitRepoCourse } from '@/deprecatedSchemas/models/course/GitRepoCourse';
import { MoveCourseItemDirection } from '@/deprecatedSchemas/models/enums';
import { Space } from '@prisma/client';
import fs from 'fs';
import { AddTopicInput, CourseBasicInfoInput, DeleteTopicInput, MoveTopicInput, UpdateTopicBasicInfoInput } from '@/graphql/generated/graphql';
import { CourseRepoInfo } from '@/helpers/course/getCourseHelper';
import { commitAndPushUpdatedCourse, getCourseAndRepoInfo, updateCourseFile } from '@/helpers/course/updates/courseUpdateHelper';
import { writeToFile } from '@/helpers/fileWriter';
import { slugify } from '@/helpers/space/slugify';
import yaml from 'js-yaml';

export async function doUpdateCourseYamlFile(repoInfo: CourseRepoInfo, updateCourseYamlFn: (course: GitRepoCourse) => GitRepoCourse) {
  const courseYamlFile = repoInfo.repositoryPath + '/src/course.yaml';

  const courseYaml = yaml.load(fs.readFileSync(courseYamlFile, 'utf8')) as any;

  const updatedYaml: GitRepoCourse = updateCourseYamlFn(courseYaml);

  const yamlContents: string = yaml.dump(updatedYaml);

  await writeToFile(courseYamlFile, yamlContents);
}

async function doUpdateCourse<T extends { courseKey: string }>(
  accountId: string,
  space: Space,
  input: T,
  updateCourseFn: (course: GitCourseModel) => GitCourseModel,
  updateCourseYamlFn: (course: GitRepoCourse) => GitRepoCourse,
) {
  const spaceId = space.id;
  const { courseFromRepository, repoInfo } = await getCourseAndRepoInfo(space, input.courseKey);

  const updatedCourse = updateCourseFn(courseFromRepository);

  await updateCourseFile(repoInfo, updatedCourse);

  await doUpdateCourseYamlFile(repoInfo, updateCourseYamlFn);

  return await commitAndPushUpdatedCourse({
    accountId,
    repoInfo,
    spaceId,
    updatedCourse,
    courseKey: input.courseKey,
  });
}

export async function updateCourseBasicInfo(accountId: string, space: Space, courseBasicInfo: CourseBasicInfoInput): Promise<GitCourseModel> {
  const updateCourseFn = (courseFromRedis: GitCourseModel): GitCourseModel => {
    return {
      ...courseFromRedis,
      title: courseBasicInfo.title,
      summary: courseBasicInfo.summary,
      details: courseBasicInfo.details,
      priority: courseBasicInfo.priority || undefined,
      publishStatus: courseBasicInfo.publishStatus,
      thumbnail: courseBasicInfo.thumbnail,
      duration: courseBasicInfo.duration,
      highlights: courseBasicInfo.highlights,
      courseAdmins: courseBasicInfo.courseAdmins.map((a) => a.toLowerCase()),
      courseFailContent: courseBasicInfo.courseFailContent || undefined,
      coursePassContent: courseBasicInfo.coursePassContent || undefined,
      coursePassCount: courseBasicInfo.coursePassCount || undefined,
      topicConfig: courseBasicInfo.topicConfig || undefined,
    };
  };

  const updatedCourseYamlFn = (courseYaml: GitRepoCourse) => {
    return {
      ...courseYaml,
      title: courseBasicInfo.title,
      summary: courseBasicInfo.summary,
      details: courseBasicInfo.details,
      priority: courseBasicInfo.priority || undefined,
      publishStatus: courseBasicInfo.publishStatus,
      thumbnail: courseBasicInfo.thumbnail,
      duration: courseBasicInfo.duration,
      highlights: courseBasicInfo.highlights,
      courseAdmins: courseBasicInfo.courseAdmins.map((a) => a.toLowerCase()),
      courseFailContent: courseBasicInfo.courseFailContent || undefined,
      coursePassContent: courseBasicInfo.coursePassContent || undefined,
      coursePassCount: courseBasicInfo.coursePassCount || undefined,
      topicConfig: courseBasicInfo.topicConfig || undefined,
    };
  };

  const input = { ...courseBasicInfo, courseKey: courseBasicInfo.key };
  return await doUpdateCourse(accountId, space, input, updateCourseFn, updatedCourseYamlFn);
}

export async function addTopic(accountId: string, space: Space, input: AddTopicInput): Promise<GitCourseTopicModel> {
  const newTopic: GitCourseTopicModel = {
    key: slugify(input.title),
    title: input.title,
    details: input.details,
    explanations: [],
    readings: [],
    summaries: [],
    questions: [],
  };

  const updateCourseFn = (courseFromRedis: GitCourseModel): GitCourseModel => {
    return {
      ...courseFromRedis,
      topics: [...(courseFromRedis.topics || []), newTopic],
    };
  };

  const updatedCourseYamlFn = (courseYaml: GitRepoCourse) => {
    return {
      ...courseYaml,
      topics: [...(courseYaml.topics || []), { key: slugify(input.title), title: input.title, details: input.details }],
    };
  };

  await doUpdateCourse(accountId, space, input, updateCourseFn, updatedCourseYamlFn);

  return newTopic;
}

export async function updateTopicInfo(accountId: string, space: Space, input: UpdateTopicBasicInfoInput): Promise<GitCourseModel> {
  const updateCourseFn = (courseFromRedis: GitCourseModel): GitCourseModel => {
    return {
      ...courseFromRedis,
      topics: (courseFromRedis.topics || []).map((topic) => (topic.key === input.topicKey ? { ...topic, title: input.title, details: input.details } : topic)),
    };
  };

  const updatedCourseYamlFn = (courseYaml: GitRepoCourse) => {
    return {
      ...courseYaml,
      topics: (courseYaml.topics || []).map((topic) => (topic.key === input.topicKey ? { ...topic, title: input.title, details: input.details } : topic)),
    };
  };

  return await doUpdateCourse(accountId, space, input, updateCourseFn, updatedCourseYamlFn);
}

function doMoveTopics<T extends { key: string }>(topics: T[], input: MoveTopicInput): T[] {
  const topicIndex = topics.findIndex((topic) => topic.key === input.topicKey);
  if (input.direction === MoveCourseItemDirection.Up) {
    if (topicIndex === 0) {
      throw new Error('Cannot move up as its already at the top place :' + JSON.stringify(input));
    }
    const oneItemBefore = topics[topicIndex - 1];
    const topic = topics[topicIndex];
    topics[topicIndex - 1] = topic;
    topics[topicIndex] = oneItemBefore;
  } else {
    if (topicIndex === topics.length - 1) {
      throw new Error('Cannot move up as its already at the top place :' + JSON.stringify(input));
    }
    const oneItemAfter = topics[topicIndex + 1];
    const topic = topics[topicIndex];
    topics[topicIndex + 1] = topic;
    topics[topicIndex] = oneItemAfter;
  }
  return topics;
}

export async function moveTopic(accountId: string, space: Space, input: MoveTopicInput): Promise<GitCourseModel> {
  const updateCourseFn = (courseFromRedis: GitCourseModel): GitCourseModel => {
    return {
      ...courseFromRedis,
      topics: doMoveTopics(courseFromRedis.topics, input),
    };
  };

  const updatedCourseYamlFn = (courseYaml: GitRepoCourse) => {
    return {
      ...courseYaml,
      topics: doMoveTopics(courseYaml.topics, input),
    };
  };

  return await doUpdateCourse(accountId, space, input, updateCourseFn, updatedCourseYamlFn);
}

export async function deleteTopic(accountId: string, space: Space, input: DeleteTopicInput): Promise<GitCourseModel> {
  const updateCourseFn = (courseFromRedis: GitCourseModel): GitCourseModel => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.filter((topic) => topic.key !== input.topicKey),
    };
  };

  const updatedCourseYamlFn = (courseYaml: GitRepoCourse) => {
    return {
      ...courseYaml,
      topics: courseYaml.topics.filter((topic) => topic.key !== input.topicKey),
    };
  };

  return await doUpdateCourse(accountId, space, input, updateCourseFn, updatedCourseYamlFn);
}
