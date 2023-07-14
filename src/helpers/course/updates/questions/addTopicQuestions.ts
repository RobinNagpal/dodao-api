import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { TopicQuestionModel } from '@/deprecatedSchemas/models/course/TopicQuestionModel';
import { AddTopicQuestionsInput } from '@/graphql/generated/graphql';
import { doUpdateTopicQuestion } from '@/helpers/course/updates/questions/doUpdateTopicQuestion';
import { Space } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export async function addTopicQuestions(accountId: string, space: Space, input: AddTopicQuestionsInput): Promise<TopicQuestionModel[]> {
  const newQuestions = input.questions.map((q) => ({
    uuid: uuidv4(),
    type: q.questionType,
    content: q.content,
    hint: q.hint,
    explanation: q.explanation,
    answerKeys: q.answerKeys,
    subTopics: [],
    difficultyLevel: 'Medium',
    choices: q.choices,
  }));

  const updateCourseFn = (courseFromRedis: GitCourseModel) => {
    return {
      ...courseFromRedis,
      topics: courseFromRedis.topics.map((topic) => {
        return topic.key === input.topicKey
          ? {
              ...topic,
              questions: [...(topic.questions || []), ...newQuestions],
            }
          : topic;
      }),
    };
  };

  const updateQuestionsFn = (questionsInYaml: TopicQuestionModel[]): TopicQuestionModel[] => {
    return [...(questionsInYaml || []), ...newQuestions];
  };

  await doUpdateTopicQuestion(accountId, space, input, updateCourseFn, updateQuestionsFn, true);

  return newQuestions;
}
