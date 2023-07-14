import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { QuestionChoice, TopicQuestionModel } from '@/deprecatedSchemas/models/course/TopicQuestionModel';
import { MoveCourseItemDirection } from '@/deprecatedSchemas/models/enums';
import { AddTopicQuestionInput, DeleteTopicQuestionInput, MoveTopicQuestionInput, UpdateTopicQuestionInput } from '@/graphql/generated/graphql';
import { doUpdateTopicQuestion } from '@/helpers/course/updates/questions/doUpdateTopicQuestion';
import { Space } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

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
