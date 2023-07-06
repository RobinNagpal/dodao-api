import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { TopicReadingModel } from '@/deprecatedSchemas/models/course/TopicReadingModel';
import { MoveCourseItemDirection } from '@/deprecatedSchemas/models/enums';
import { Space } from '@prisma/client';
import fs from 'fs';
import { AddTopicVideoInput, DeleteTopicVideoInput, MoveTopicVideoInput, UpdateTopicVideoInput } from '@/graphql/generated/graphql';
import { CourseRepoInfo } from '@/helpers/course/getCourseHelper';
import { commitAndPushUpdatedCourse, getCourseAndRepoInfo, getTopicInCourseFile, updateCourseFile } from '@/helpers/course/updates/courseUpdateHelper';
import { doUpdateCourseYamlFile } from '@/helpers/course/updates/updateCourseBasicInfo';
import { writeToFile } from '@/helpers/fileWriter';
import yaml from 'js-yaml';
import { v4 as uuidv4 } from 'uuid';

async function addNewReadingFile<T>(input: T, repoInfo: CourseRepoInfo) {
  const addInput = input as any as AddTopicVideoInput;

  const readingFileName = addInput.topicKey + '.yaml';

  await doUpdateCourseYamlFile(repoInfo, (courseYaml) => ({
    ...courseYaml,
    topics: courseYaml.topics.map((topic) => (topic.key === addInput.topicKey ? { ...topic, readings: readingFileName } : topic)),
  }));

  const readings: TopicReadingModel[] = [
    {
      uuid: uuidv4(),
      title: addInput.title,
      shortTitle: addInput.shortTitle,
      details: addInput.details,
      type: 'YoutubeVideo',
      url: addInput.url,
      subTopics: [],
    },
  ];

  const newReadingFile = repoInfo.repositoryPath + '/src/readings/' + readingFileName;

  const updatedSummaries: string = yaml.dump(readings);

  await writeToFile(newReadingFile, updatedSummaries);
}
export async function doUpdateTopicVideo<T extends { courseKey: string; topicKey: string }>(
  accountId: string,
  space: Space,
  input: T,
  courseUpdateFn: (updatedCourse: GitCourseModel) => GitCourseModel,
  readingsUpdateFn: (readings: TopicReadingModel[]) => TopicReadingModel[],
  addNewReadingsFileIfNotPresent = false,
): Promise<GitCourseModel> {
  const spaceId = space.id;
  const { courseFromRepository, repoInfo } = await getCourseAndRepoInfo(space, input.courseKey);

  const updatedCourse: GitCourseModel = courseUpdateFn(courseFromRepository);
  await updateCourseFile(repoInfo, updatedCourse);

  const topicInCourseFile = getTopicInCourseFile(repoInfo, input.courseKey, input.topicKey);
  if (addNewReadingsFileIfNotPresent && !topicInCourseFile.readings) {
    await addNewReadingFile(input, repoInfo);
  } else {
    if (!topicInCourseFile.readings) {
      throw new Error(`Readings file not present in course.yaml ${input.topicKey}`);
    }

    const readingYamlFile = repoInfo.repositoryPath + '/src/readings/' + topicInCourseFile.readings;
    const readingsInYaml = yaml.load(fs.readFileSync(readingYamlFile, 'utf8')) as TopicReadingModel[];

    if (!readingsInYaml || !readingsInYaml.length) {
      throw new Error(`No contents present in readings file ${readingYamlFile}.  \n ${JSON.stringify(readingsInYaml)}  \n`);
    }

    const updatedReadings: string = yaml.dump(readingsUpdateFn(readingsInYaml));

    await writeToFile(readingYamlFile, updatedReadings);
  }

  return await commitAndPushUpdatedCourse({ accountId, repoInfo, spaceId, updatedCourse, courseKey: input.courseKey });
}

export async function updateTopicVideo(accountId: string, space: Space, input: UpdateTopicVideoInput): Promise<GitCourseModel> {
  const updateCourseFunction = (courseFromRedis: GitCourseModel): GitCourseModel => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) =>
        topic.key === input.topicKey
          ? {
              ...topic,
              readings: topic.readings?.map((reading) =>
                reading.uuid === input.videoUuid
                  ? {
                      uuid: input.videoUuid,
                      shortTitle: input.shortTitle,
                      details: input.details,
                      title: input.title,
                      type: 'YoutubeVideo',
                      url: input.url,
                      subTopics: [],
                    }
                  : reading,
              ),
            }
          : topic,
      ),
    };
  };
  const updateReadingsFn = (readingsInYaml: TopicReadingModel[]): TopicReadingModel[] => {
    return readingsInYaml.map((reading) =>
      reading.uuid === input.videoUuid
        ? {
            uuid: input.videoUuid,
            shortTitle: input.shortTitle,
            details: input.details,
            title: input.title,
            type: 'YoutubeVideo',
            url: input.url,
            subTopics: [],
          }
        : reading,
    );
  };

  return await doUpdateTopicVideo(accountId, space, input, updateCourseFunction, updateReadingsFn);
}

export async function addTopicVideo(accountId: string, space: Space, input: AddTopicVideoInput): Promise<TopicReadingModel> {
  const newVideo = {
    uuid: uuidv4(),
    shortTitle: input.shortTitle,
    details: input.details,
    title: input.title,
    type: 'YoutubeVideo',
    url: input.url,
    subTopics: [],
  };

  const updateCourseFunction = (courseFromRedis: GitCourseModel): GitCourseModel => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) =>
        topic.key === input.topicKey
          ? {
              ...topic,
              readings: [...(topic.readings || []), newVideo],
            }
          : topic,
      ),
    };
  };
  const updateReadingsFn = (readingsInYaml: TopicReadingModel[]): TopicReadingModel[] => {
    return [...(readingsInYaml || []), newVideo];
  };

  await doUpdateTopicVideo(accountId, space, input, updateCourseFunction, updateReadingsFn, true);

  return newVideo;
}

export async function deleteTopicVideo(accountId: string, space: Space, input: DeleteTopicVideoInput): Promise<GitCourseModel> {
  const updateCourseFunction = (courseFromRedis: GitCourseModel): GitCourseModel => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) =>
        topic.key === input.topicKey
          ? {
              ...topic,
              readings: topic.readings?.filter((reading) => reading.uuid !== input.videoUuid),
            }
          : topic,
      ),
    };
  };
  const updateReadingsFn = (readingsInYaml: TopicReadingModel[]): TopicReadingModel[] => {
    return readingsInYaml.filter((reading) => reading.uuid !== input.videoUuid);
  };

  return await doUpdateTopicVideo(accountId, space, input, updateCourseFunction, updateReadingsFn);
}

function doMoveReadings(readings: TopicReadingModel[], input: MoveTopicVideoInput) {
  const readingIndex = readings.findIndex((reading) => reading.uuid === input.videoUuid);
  if (input.direction === MoveCourseItemDirection.Up) {
    if (readingIndex === 0) {
      throw new Error('Cannot move up as its already at the top place :' + JSON.stringify(input));
    }
    const oneItemBefore = readings[readingIndex - 1];
    const reading = readings[readingIndex];
    readings[readingIndex - 1] = reading;
    readings[readingIndex] = oneItemBefore;
  } else {
    if (readingIndex === readings.length - 1) {
      throw new Error('Cannot move up as its already at the top place :' + JSON.stringify(input));
    }
    const oneItemAfter = readings[readingIndex + 1];
    const reading = readings[readingIndex];
    readings[readingIndex + 1] = reading;
    readings[readingIndex] = oneItemAfter;
  }
  return readings;
}

export async function moveTopicVideo(accountId: string, space: Space, input: MoveTopicVideoInput): Promise<GitCourseModel> {
  const courseUpdateFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) => {
        if (topic.key === input.topicKey) {
          const movedReadings = doMoveReadings(topic.readings || [], input);
          return {
            ...topic,
            readings: movedReadings,
          };
        } else {
          return topic;
        }
      }),
    };
  };

  const readingsUpdateFn = (readingsInYaml: TopicReadingModel[]) => {
    return doMoveReadings(readingsInYaml || [], input);
  };

  return await doUpdateTopicVideo(accountId, space, input, courseUpdateFn, readingsUpdateFn);
}
