import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { TopicSummaryModel } from '@/deprecatedSchemas/models/course/TopicSummaryModel';
import { MoveCourseItemDirection } from '@/deprecatedSchemas/models/enums';
import { Space } from '@prisma/client';
import fs from 'fs';
import { AddTopicSummaryInput, DeleteTopicSummaryInput, MoveTopicSummaryInput, UpdateTopicSummaryInput } from '@/graphql/generated/graphql';
import { CourseRepoInfo } from '@/helpers/course/getCourseHelper';
import { commitAndPushUpdatedCourse, getCourseAndRepoInfo, getTopicInCourseFile, updateCourseFile } from '@/helpers/course/updates/courseUpdateHelper';
import { doUpdateCourseYamlFile } from '@/helpers/course/updates/updateCourseBasicInfo';
import { writeToFile } from '@/helpers/fileWriter';
import { getRandomInt } from '@/helpers/space/getRandomInt';
import { slugify } from '@/helpers/space/slugify';
import yaml from 'js-yaml';

async function addNewSummaryFile<T>(input: T, repoInfo: CourseRepoInfo) {
  const addInput = input as any as AddTopicSummaryInput;

  const summaryFileName = addInput.topicKey + '.yaml';

  await doUpdateCourseYamlFile(repoInfo, (courseYaml) => ({
    ...courseYaml,
    topics: courseYaml.topics.map((topic) => (topic.key === addInput.topicKey ? { ...topic, summaries: summaryFileName } : topic)),
  }));

  const summaries: TopicSummaryModel[] = [
    {
      key: slugify(addInput.title),
      title: addInput.title,
      shortTitle: addInput.shortTitle,
      details: addInput.details,
    },
  ];

  const newSummaryFile = repoInfo.repositoryPath + '/src/summaries/' + summaryFileName;

  const updatedSummaries: string = yaml.dump(summaries);

  await writeToFile(newSummaryFile, updatedSummaries);
}

export async function doUpdateTopicSummary<T extends { courseKey: string; topicKey: string }>(
  accountId: string,
  space: Space,
  input: T,
  courseUpdateFn: (updatedCourse: GitCourseModel) => GitCourseModel,
  summariesUpdateFn: (summariesInYaml: TopicSummaryModel[]) => TopicSummaryModel[],
  addNewSummaryFileIfNotPresent = false,
): Promise<GitCourseModel> {
  const spaceId = space.id;
  const { courseFromRepository, repoInfo } = await getCourseAndRepoInfo(space, input.courseKey);

  const updatedCourse = courseUpdateFn(courseFromRepository);

  await updateCourseFile(repoInfo, updatedCourse);
  const topicInCourseFile = getTopicInCourseFile(repoInfo, input.courseKey, input.topicKey);

  if (addNewSummaryFileIfNotPresent && !topicInCourseFile.summaries) {
    await addNewSummaryFile(input, repoInfo);
  } else {
    if (!topicInCourseFile.summaries) {
      throw new Error(`Summaries file not present in course.yaml ${input.topicKey}`);
    }

    const summaryYamlFile = repoInfo.repositoryPath + '/src/summaries/' + topicInCourseFile.summaries;
    const summariesInYaml = yaml.load(fs.readFileSync(summaryYamlFile, 'utf8')) as TopicSummaryModel[];

    if (!summariesInYaml || !summariesInYaml.length) {
      throw new Error(`No contents present in summaries file ${summaryYamlFile}.  \n ${JSON.stringify(summariesInYaml)}  \n`);
    }

    const updatedSummaries: string = yaml.dump(summariesUpdateFn(summariesInYaml));

    await writeToFile(summaryYamlFile, updatedSummaries);
  }
  return await commitAndPushUpdatedCourse({ accountId, repoInfo, spaceId, updatedCourse, courseKey: input.courseKey });
}

export async function updateTopicSummary(accountId: string, space: Space, input: UpdateTopicSummaryInput): Promise<GitCourseModel> {
  const courseUpdateFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) =>
        topic.key === input.topicKey
          ? {
              ...topic,
              summaries: topic.summaries?.map((summary) =>
                summary.key === input.summaryKey
                  ? {
                      title: input.title,
                      key: input.summaryKey,
                      shortTitle: input.shortTitle,
                      details: input.details,
                    }
                  : summary,
              ),
            }
          : topic,
      ),
    };
  };

  const summariesUpdateFn = (summariesInYaml: TopicSummaryModel[]): TopicSummaryModel[] => {
    return summariesInYaml.map((summary) =>
      summary.key === input.summaryKey
        ? {
            key: input.summaryKey,
            title: summary.title,
            shortTitle: input.shortTitle,
            details: input.details,
          }
        : summary,
    );
  };

  return await doUpdateTopicSummary(accountId, space, input, courseUpdateFn, summariesUpdateFn);
}

export async function addTopicSummary(accountId: string, space: Space, input: AddTopicSummaryInput): Promise<TopicSummaryModel> {
  const newSummaryKey = slugify(input.title);

  const { courseFromRepository } = await getCourseAndRepoInfo(space, input.courseKey);

  const normalizedSummaryKey = courseFromRepository?.topics.some((topic) => topic.summaries?.some((summary) => summary.key === newSummaryKey))
    ? `${newSummaryKey}-${getRandomInt(1, 100)}`
    : newSummaryKey;

  const newSummary = {
    key: normalizedSummaryKey,
    shortTitle: input.shortTitle,
    details: input.details,
    title: input.title,
  };

  const courseUpdateFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) => {
        return topic.key === input.topicKey
          ? {
              ...topic,
              summaries: [...(topic.summaries || []), newSummary],
            }
          : topic;
      }),
    };
  };

  const summariesUpdateFn = (summariesInYaml: TopicSummaryModel[]) => {
    return [...(summariesInYaml || []), newSummary];
  };

  await doUpdateTopicSummary(accountId, space, input, courseUpdateFn, summariesUpdateFn, true);
  return newSummary;
}

export async function deleteTopicSummary(accountId: string, space: Space, input: DeleteTopicSummaryInput): Promise<GitCourseModel> {
  const courseUpdateFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) => {
        return topic.key === input.topicKey
          ? {
              ...topic,
              summaries: topic.summaries?.filter((summary) => summary.key !== input.summaryKey),
            }
          : topic;
      }),
    };
  };

  const summariesUpdateFn = (summariesInYaml: TopicSummaryModel[]) => {
    return summariesInYaml.filter((summary) => summary.key !== input.summaryKey);
  };

  return await doUpdateTopicSummary(accountId, space, input, courseUpdateFn, summariesUpdateFn);
}

function doMoveSummaries(summaries: TopicSummaryModel[], input: MoveTopicSummaryInput) {
  const summaryIndex = summaries.findIndex((summary) => summary.key === input.summaryKey);
  if (input.direction === MoveCourseItemDirection.Up) {
    if (summaryIndex === 0) {
      throw new Error('Cannot move up as its already at the top place :' + JSON.stringify(input));
    }
    const oneItemBefore = summaries[summaryIndex - 1];
    const summary = summaries[summaryIndex];
    summaries[summaryIndex - 1] = summary;
    summaries[summaryIndex] = oneItemBefore;
  } else {
    if (summaryIndex === summaries.length - 1) {
      throw new Error('Cannot move up as its already at the top place :' + JSON.stringify(input));
    }
    const oneItemAfter = summaries[summaryIndex + 1];
    const summary = summaries[summaryIndex];
    summaries[summaryIndex + 1] = summary;
    summaries[summaryIndex] = oneItemAfter;
  }
  return summaries;
}

export async function moveTopicSummary(accountId: string, space: Space, input: MoveTopicSummaryInput): Promise<GitCourseModel> {
  const courseUpdateFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) => {
        if (topic.key === input.topicKey) {
          const movedSummaries = doMoveSummaries(topic.summaries || [], input);
          return {
            ...topic,
            summaries: movedSummaries,
          };
        } else {
          return topic;
        }
      }),
    };
  };

  const summariesUpdateFn = (summariesInYaml: TopicSummaryModel[]) => {
    return doMoveSummaries(summariesInYaml || [], input);
  };

  return await doUpdateTopicSummary(accountId, space, input, courseUpdateFn, summariesUpdateFn);
}
