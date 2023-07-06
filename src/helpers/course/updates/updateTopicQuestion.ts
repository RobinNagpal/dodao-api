import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { QuestionChoice, TopicQuestionModel } from '@/deprecatedSchemas/models/course/TopicQuestionModel';
import { MoveCourseItemDirection } from '@/deprecatedSchemas/models/enums';
import { Space } from '@prisma/client';
import fs from 'fs';
import { AddTopicQuestionInput, DeleteTopicQuestionInput, MoveTopicQuestionInput, UpdateTopicQuestionInput } from '@/graphql/generated/graphql';
import { CourseRepoInfo } from '@/helpers/course/getCourseHelper';
import { commitAndPushUpdatedCourse, getCourseAndRepoInfo, getTopicInCourseFile, updateCourseFile } from '@/helpers/course/updates/courseUpdateHelper';
import { doUpdateCourseYamlFile } from '@/helpers/course/updates/updateCourseBasicInfo';
import { writeToFile } from '@/helpers/fileWriter';
import yaml from 'js-yaml';
import { v4 as uuidv4 } from 'uuid';

async function addNewQuestionFile<T>(input: T, repoInfo: CourseRepoInfo) {
  const addInput = input as any as AddTopicQuestionInput;

  const questionFileName = addInput.topicKey + '.yaml';

  await doUpdateCourseYamlFile(repoInfo, (courseYaml) => ({
    ...courseYaml,
    topics: courseYaml.topics.map((topic) => (topic.key === addInput.topicKey ? { ...topic, questions: questionFileName } : topic)),
  }));

  const questionModels: TopicQuestionModel[] = [
    {
      uuid: uuidv4(),
      type: addInput.questionType,
      content: addInput.content,
      hint: addInput.hint,
      explanation: addInput.explanation,
      answerKeys: addInput.answerKeys,
      subTopics: [],
      difficultyLevel: 'Medium',
      choices: addInput.choices,
    },
  ];

  const newQuestionFile = repoInfo.repositoryPath + '/src/questions/' + questionFileName;

  const updatedSummaries: string = yaml.dump(questionModels);

  await writeToFile(newQuestionFile, updatedSummaries);
}

export async function doUpdateTopicQuestion<T extends { courseKey: string; topicKey: string }>(
  accountId: string,
  space: Space,
  input: T,
  courseUpdateFn: (updatedCourse: GitCourseModel) => GitCourseModel,
  questionsUpdateFn: (questions: TopicQuestionModel[]) => TopicQuestionModel[],
  addNewQuestionsFileIfNotPresent = false,
): Promise<GitCourseModel> {
  const spaceId = space.id;
  const { courseFromRepository, repoInfo } = await getCourseAndRepoInfo(space, input.courseKey);

  const updatedCourse: GitCourseModel = courseUpdateFn(courseFromRepository);
  await updateCourseFile(repoInfo, updatedCourse);

  const topicInCourseFile = getTopicInCourseFile(repoInfo, input.courseKey, input.topicKey);
  if (addNewQuestionsFileIfNotPresent && !topicInCourseFile.questions) {
    await addNewQuestionFile(input, repoInfo);
  } else {
    if (!topicInCourseFile.questions) {
      throw new Error(`Readings file not present in course.yaml ${input.topicKey}`);
    }

    const questionYamlFile = repoInfo.repositoryPath + '/src/questions/' + topicInCourseFile.questions;
    const questionsInYaml = yaml.load(fs.readFileSync(questionYamlFile, 'utf8')) as TopicQuestionModel[];

    if (!questionsInYaml || !questionsInYaml.length) {
      throw new Error(`No contents present in questions file ${questionYamlFile}.  \n ${JSON.stringify(questionsInYaml)}  \n`);
    }

    const updatedQuestions: string = yaml.dump(questionsUpdateFn(questionsInYaml));

    await writeToFile(questionYamlFile, updatedQuestions);
  }
  return await commitAndPushUpdatedCourse({ accountId, repoInfo, spaceId, updatedCourse, courseKey: input.courseKey });
}

export async function updateTopicQuestion(accountId: string, space: Space, input: UpdateTopicQuestionInput): Promise<GitCourseModel> {
  const updateCourseFunction = (courseFromRedis: GitCourseModel): GitCourseModel => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) =>
        topic.key === input.topicKey
          ? {
              ...topic,
              questions: topic.questions?.map((question) =>
                question.uuid === input.questionUuid
                  ? {
                      uuid: input.questionUuid,
                      type: input.questionType,
                      content: input.content,
                      hint: input.hint,
                      explanation: input.explanation,
                      answerKeys: input.answerKeys,
                      subTopics: [],
                      difficultyLevel: 'Medium',
                      choices: input.choices,
                    }
                  : question,
              ),
            }
          : topic,
      ),
    };
  };

  const updateQuestionsFn = (questionsInYaml: TopicQuestionModel[]): TopicQuestionModel[] => {
    return questionsInYaml.map((question) =>
      question.uuid === input.questionUuid
        ? {
            uuid: input.questionUuid,
            type: input.questionType,
            content: input.content,
            hint: input.hint,
            explanation: input.explanation,
            answerKeys: input.answerKeys,
            subTopics: [],
            difficultyLevel: 'Medium',
            choices: input.choices.map((choice): QuestionChoice => ({ key: choice.key, content: choice.content })),
          }
        : question,
    );
  };

  return await doUpdateTopicQuestion(accountId, space, input, updateCourseFunction, updateQuestionsFn);
}

export async function addTopicQuestion(accountId: string, space: Space, input: AddTopicQuestionInput): Promise<TopicQuestionModel> {
  const newQuestion = {
    uuid: uuidv4(),
    type: input.questionType,
    content: input.content,
    hint: input.hint,
    explanation: input.explanation,
    answerKeys: input.answerKeys,
    subTopics: [],
    difficultyLevel: 'Medium',
    choices: input.choices,
  };

  const updateCourseFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) => {
        return topic.key === input.topicKey
          ? {
              ...topic,
              questions: [...(topic.questions || []), newQuestion],
            }
          : topic;
      }),
    };
  };

  const updateQuestionsFn = (questionsInYaml: TopicQuestionModel[]): TopicQuestionModel[] => {
    return [...(questionsInYaml || []), newQuestion];
  };

  await doUpdateTopicQuestion(accountId, space, input, updateCourseFn, updateQuestionsFn, true);

  return newQuestion;
}

export async function deleteTopicQuestion(accountId: string, space: Space, input: DeleteTopicQuestionInput): Promise<GitCourseModel> {
  const updateCourseFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) => {
        return topic.key === input.topicKey
          ? {
              ...topic,
              questions: topic.questions?.filter((q) => q.uuid !== input.questionUuid),
            }
          : topic;
      }),
    };
  };

  const updateQuestionsFn = (questionsInYaml: TopicQuestionModel[]): TopicQuestionModel[] => {
    return questionsInYaml.filter((q) => q.uuid !== input.questionUuid);
  };

  return await doUpdateTopicQuestion(accountId, space, input, updateCourseFn, updateQuestionsFn);
}

function doMoveQuestions(questions: TopicQuestionModel[], input: MoveTopicQuestionInput) {
  const questionIndex = questions.findIndex((question) => question.uuid === input.questionUuid);
  if (input.direction === MoveCourseItemDirection.Up) {
    if (questionIndex === 0) {
      throw new Error('Cannot move up as its already at the top place :' + JSON.stringify(input));
    }
    const oneItemBefore = questions[questionIndex - 1];
    const question = questions[questionIndex];
    questions[questionIndex - 1] = question;
    questions[questionIndex] = oneItemBefore;
  } else {
    if (questionIndex === questions.length - 1) {
      throw new Error('Cannot move up as its already at the top place :' + JSON.stringify(input));
    }
    const oneItemAfter = questions[questionIndex + 1];
    const question = questions[questionIndex];
    questions[questionIndex + 1] = question;
    questions[questionIndex] = oneItemAfter;
  }
  return questions;
}

export async function moveTopicQuestion(accountId: string, space: Space, input: MoveTopicQuestionInput): Promise<GitCourseModel> {
  const courseUpdateFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) => {
        if (topic.key === input.topicKey) {
          const movedQuestions = doMoveQuestions(topic.questions || [], input);
          return {
            ...topic,
            questions: movedQuestions,
          };
        } else {
          return topic;
        }
      }),
    };
  };

  const questionsUpdateFn = (questionsInYaml: TopicQuestionModel[]) => {
    return doMoveQuestions(questionsInYaml || [], input);
  };

  return await doUpdateTopicQuestion(accountId, space, input, courseUpdateFn, questionsUpdateFn);
}
