import { GitCourseModel } from '@/deprecatedSchemas/models/course/GitCourseModel';
import { TopicQuestionModel } from '@/deprecatedSchemas/models/course/TopicQuestionModel';
import {
  AddTopicQuestionInput,
  AddTopicQuestionsInput,
  DeleteTopicQuestionInput,
  MoveTopicQuestionInput,
  UpdateTopicQuestionInput,
} from '@/graphql/generated/graphql';
import { commitAndPushUpdatedCourse, getCourseAndRepoInfo, getTopicInCourseFile, updateCourseFile } from '@/helpers/course/updates/courseUpdateHelper';
import { doUpdateCourseYamlFile } from '@/helpers/course/updates/updateCourseBasicInfo';
import { writeToFile } from '@/helpers/fileWriter';
import { Space } from '@prisma/client';
import fs from 'fs';
import yaml from 'js-yaml';

export async function doUpdateTopicQuestion(
  accountId: string,
  space: Space,
  input: AddTopicQuestionsInput | AddTopicQuestionInput | UpdateTopicQuestionInput | DeleteTopicQuestionInput | MoveTopicQuestionInput,
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
    const addInput = input as any as AddTopicQuestionInput;

    const questionFileName = addInput.topicKey + '.yaml';

    await doUpdateCourseYamlFile(repoInfo, (courseYaml) => ({
      ...courseYaml,
      topics: courseYaml.topics.map((topic) =>
        topic.key === addInput.topicKey
          ? {
              ...topic,
              questions: questionFileName,
            }
          : topic,
      ),
    }));

    const newQuestionFile = repoInfo.repositoryPath + '/src/questions/' + questionFileName;

    const emptyQuestionsArray: string = yaml.dump([]);
    await writeToFile(newQuestionFile, emptyQuestionsArray);
  } else {
    if (!topicInCourseFile.questions) {
      throw new Error(`Readings file not present in course.yaml ${input.topicKey}`);
    }
  }
  const questionYamlFile = repoInfo.repositoryPath + '/src/questions/' + topicInCourseFile.questions;
  const questionsInYaml = yaml.load(fs.readFileSync(questionYamlFile, 'utf8')) as TopicQuestionModel[];

  const updatedQuestions: string = yaml.dump(questionsUpdateFn(questionsInYaml));

  await writeToFile(questionYamlFile, updatedQuestions);

  return await commitAndPushUpdatedCourse({ accountId, repoInfo, spaceId, updatedCourse, courseKey: input.courseKey });
}
