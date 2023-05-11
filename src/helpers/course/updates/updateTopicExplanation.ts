import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { TopicExplanationModel } from '@/deprecatedSchemas/models/course/TopicExplanationModel';
import { MoveCourseItemDirection } from '@/deprecatedSchemas/models/enums';
import { Space } from '@prisma/client';
import fs from 'fs';
import { AddTopicExplanationInput, DeleteTopicExplanationInput, MoveTopicExplanationInput, UpdateTopicExplanationInput } from '@/graphql/generated/graphql';
import { CourseRepoInfo } from '@/helpers/course/getCourseHelper';
import { commitAndPushUpdatedCourse, getCourseAndRepoInfo, getTopicInCourseFile, updateCourseFile } from '@/helpers/course/updates/courseUpdateHelper';
import { doUpdateCourseYamlFile } from '@/helpers/course/updates/updateCourseBasicInfo';
import { writeToFile } from '@/helpers/fileWriter';
import { getRandomInt } from '@/helpers/space/getRandomInt';
import { slugify } from '@/helpers/space/slugify';
import yaml from 'js-yaml';

async function addNewExplanationFile<T>(input: T, repoInfo: CourseRepoInfo) {
  const addInput = input as any as AddTopicExplanationInput;

  const explanationFileName = addInput.topicKey + '.yaml';

  await doUpdateCourseYamlFile(repoInfo, (courseYaml) => ({
    ...courseYaml,
    topics: courseYaml.topics.map((topic) => (topic.key === addInput.topicKey ? { ...topic, explanations: explanationFileName } : topic)),
  }));

  const explanations: TopicExplanationModel[] = [
    {
      key: slugify(addInput.title),
      title: addInput.title,
      shortTitle: addInput.shortTitle,
      details: addInput.details,
    },
  ];

  const newExplanationFile = repoInfo.repositoryPath + '/src/explanations/' + explanationFileName;

  const updatedSummaries: string = yaml.dump(explanations);

  await writeToFile(newExplanationFile, updatedSummaries);
}

async function doUpdateTopicExplanation<T extends { courseKey: string; topicKey: string }>(
  accountId: string,
  space: Space,
  input: T,
  courseUpdateFn: (updatedCourse: GitCourseModel) => GitCourseModel,
  explanationsUpdateFn: (explanations: TopicExplanationModel[]) => TopicExplanationModel[],
  addNewExplanationFileIfNotPresent = false
): Promise<GitCourseModel> {
  const spaceId = space.id;
  const { courseFromRepository, repoInfo } = await getCourseAndRepoInfo(space, input.courseKey);

  const updatedCourse = courseUpdateFn(courseFromRepository);

  await updateCourseFile(repoInfo, updatedCourse);

  const topicInCourseFile = getTopicInCourseFile(repoInfo, input.courseKey, input.topicKey);
  if (addNewExplanationFileIfNotPresent && !topicInCourseFile.explanations) {
    await addNewExplanationFile(input, repoInfo);
  } else {
    if (!topicInCourseFile.explanations) {
      throw new Error(`Explanations file not present in course.yaml ${input.topicKey}`);
    }

    const explanationYamlFile = repoInfo.repositoryPath + '/src/explanations/' + topicInCourseFile.explanations;
    const explanationsInYaml = yaml.load(fs.readFileSync(explanationYamlFile, 'utf8')) as TopicExplanationModel[];

    if (!explanationsInYaml || !explanationsInYaml.length) {
      throw new Error(`No contents present in explanations file ${explanationYamlFile}.  \n ${JSON.stringify(explanationsInYaml)}  \n`);
    }

    const updatedExplanations: string = yaml.dump(explanationsUpdateFn(explanationsInYaml));

    await writeToFile(explanationYamlFile, updatedExplanations);
  }
  return await commitAndPushUpdatedCourse({ accountId, repoInfo, spaceId, updatedCourse, courseKey: input.courseKey });
}

export async function updateTopicExplanation(accountId: string, space: Space, input: UpdateTopicExplanationInput): Promise<GitCourseModel> {
  const courseUpdateFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) =>
        topic.key === input.topicKey
          ? {
              ...topic,
              explanations: topic.explanations?.map((explanation) =>
                explanation.key === input.explanationKey
                  ? {
                      key: input.explanationKey,
                      shortTitle: input.shortTitle,
                      details: input.details,
                      title: input.title,
                    }
                  : explanation
              ),
            }
          : topic
      ),
    };
  };

  const explanationsUpdateFn = (explanationsInYaml: TopicExplanationModel[]) => {
    return explanationsInYaml.map((explanation) =>
      explanation.key === input.explanationKey
        ? {
            key: input.explanationKey,
            title: explanation.title,
            shortTitle: input.shortTitle,
            details: input.details,
          }
        : explanation
    );
  };

  return await doUpdateTopicExplanation(accountId, space, input, courseUpdateFn, explanationsUpdateFn);
}

export async function addTopicExplanation(accountId: string, space: Space, input: AddTopicExplanationInput): Promise<TopicExplanationModel> {
  const newExplanationKey = slugify(input.title);

  const { courseFromRepository } = await getCourseAndRepoInfo(space, input.courseKey);

  const normalizedExplanationKey = courseFromRepository?.topics.some((topic) =>
    topic.explanations?.some((explanation) => explanation.key === newExplanationKey)
  )
    ? `${newExplanationKey}-${getRandomInt(1, 100)}`
    : newExplanationKey;

  const newExplanation = {
    key: normalizedExplanationKey,
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
              explanations: [...(topic.explanations || []), newExplanation],
            }
          : topic;
      }),
    };
  };

  const explanationsUpdateFn = (explanationsInYaml: TopicExplanationModel[]) => {
    return [...(explanationsInYaml || []), newExplanation];
  };

  await doUpdateTopicExplanation(accountId, space, input, courseUpdateFn, explanationsUpdateFn, true);
  return newExplanation;
}

export async function deleteTopicExplanation(accountId: string, space: Space, input: DeleteTopicExplanationInput): Promise<GitCourseModel> {
  const courseUpdateFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) => {
        return topic.key === input.topicKey
          ? {
              ...topic,
              explanations: topic.explanations?.filter((explanation) => explanation.key !== input.explanationKey),
            }
          : topic;
      }),
    };
  };

  const explanationsUpdateFn = (explanationsInYaml: TopicExplanationModel[]) => {
    return explanationsInYaml.filter((explanation) => explanation.key !== input.explanationKey);
  };

  return await doUpdateTopicExplanation(accountId, space, input, courseUpdateFn, explanationsUpdateFn);
}

function doMoveExplanations(explanations: TopicExplanationModel[], input: MoveTopicExplanationInput) {
  const explanationIndex = explanations.findIndex((explanation) => explanation.key === input.explanationKey);
  if (input.direction === MoveCourseItemDirection.Up) {
    if (explanationIndex === 0) {
      throw new Error('Cannot move up as its already at the top place :' + JSON.stringify({ input, explanation: explanations?.[explanationIndex] }));
    }
    const oneItemBefore = explanations[explanationIndex - 1];
    const explanation = explanations[explanationIndex];
    explanations[explanationIndex - 1] = explanation;
    explanations[explanationIndex] = oneItemBefore;
  } else {
    if (explanationIndex === explanations.length - 1) {
      throw new Error('Cannot move up as its already at the last place :' + JSON.stringify({ input, explanation: explanations?.[explanationIndex] }));
    }
    const oneItemAfter = explanations[explanationIndex + 1];
    const explanation = explanations[explanationIndex];
    explanations[explanationIndex + 1] = explanation;
    explanations[explanationIndex] = oneItemAfter;
  }
  return explanations;
}

export async function moveTopicExplanation(accountId: string, space: Space, input: MoveTopicExplanationInput): Promise<GitCourseModel> {
  const courseUpdateFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) => {
        if (topic.key === input.topicKey) {
          const movedExplanations = doMoveExplanations(topic.explanations || [], input);
          return {
            ...topic,
            explanations: movedExplanations,
          };
        } else {
          return topic;
        }
      }),
    };
  };

  const explanationsUpdateFn = (explanationsInYaml: TopicExplanationModel[]) => {
    return doMoveExplanations(explanationsInYaml || [], input);
  };

  return await doUpdateTopicExplanation(accountId, space, input, courseUpdateFn, explanationsUpdateFn);
}
