import deleteAndPullCourseRepo from '@/graphql/mutations/course/deleteAndPullCourseRepo';
import refreshGitCourseMutation from '@/graphql/mutations/course/refreshGitCourseMutation';
import refreshGitCourses from '@/graphql/mutations/course/refreshGitCourses';

import addTopicMutation from '@/graphql/mutations/course/topic/addTopicMutation';
import moveTopicMutation from '@/graphql/mutations/course/topic/moveTopicMutation';
import deleteTopicMutation from '@/graphql/mutations/course/topic/deleteTopicMutation';
import updateTopicBasicInfoMutation from '@/graphql/mutations/course/topic/updateTopicBasicInfoMutation';

import updateCourseBasicInfoMutation from '@/graphql/mutations/course/updateCourseBasicInfoMutation';
import upsertCourseIntegrationsMutation from '@/graphql/mutations/course/upsertCourseIntegrationsMutation';

import upsertGitCourseMutation from '@/graphql/mutations/course/upsertGitCourseMutation';
import upsertGitCourseTopicSubmission from '@/graphql/mutations/course/upsertGitCourseTopicSubmission';

import addTopicExplanationMutation from '@/graphql/mutations/course/topicItem/add/addTopicExplanationMutation';
import addTopicQuestionMutation from '@/graphql/mutations/course/topicItem/add/addTopicQuestionMutation';
import addTopicSummaryMutation from '@/graphql/mutations/course/topicItem/add/addTopicSummaryMutation';
import addTopicVideoMutation from '@/graphql/mutations/course/topicItem/add/addTopicVideoMutation';

import deleteTopicExplanationMutation from '@/graphql/mutations/course/topicItem/delete/deleteTopicExplanationMutation';
import deleteTopicQuestionMutation from '@/graphql/mutations/course/topicItem/delete/deleteTopicQuestionMutation';
import deleteTopicSummaryMutation from '@/graphql/mutations/course/topicItem/delete/deleteTopicSummaryMutation';
import deleteTopicVideoMutation from '@/graphql/mutations/course/topicItem/delete/deleteTopicVideoMutation';

import moveTopicExplanationMutation from '@/graphql/mutations/course/topicItem/move/moveTopicExplanationMutation';
import moveTopicQuestionMutation from '@/graphql/mutations/course/topicItem/move/moveTopicQuestionMutation';
import moveTopicSummaryMutation from '@/graphql/mutations/course/topicItem/move/moveTopicSummaryMutation';
import moveTopicVideoMutation from '@/graphql/mutations/course/topicItem/move/moveTopicVideoMutation';

import updateTopicExplanationMutation from '@/graphql/mutations/course/topicItem/update/updateTopicExplanationMutation';
import updateTopicQuestionMutation from '@/graphql/mutations/course/topicItem/update/updateTopicQuestionMutation';
import updateTopicSummaryMutation from '@/graphql/mutations/course/topicItem/update/updateTopicSummaryMutation';
import updateTopicVideoMutation from '@/graphql/mutations/course/topicItem/update/updateTopicVideoMutation';

export default {
  refreshGitCourse: (_: unknown, args: any, context: any) => refreshGitCourseMutation(_, args, context),
  refreshGitCourses: (_: unknown, args: any, context: any) => refreshGitCourses(_, args, context),

  updateCourseBasicInfo: (_: unknown, args: any, context: any) => updateCourseBasicInfoMutation(_, args, context),
  upsertCourseIntegrations: (_: unknown, args: any, context: any) => upsertCourseIntegrationsMutation(_, args, context),

  upsertGitCourse: (_: unknown, args: any, context: any) => upsertGitCourseMutation(_, args, context),
  upsertGitCourseTopicSubmission: (_: unknown, args: any, context: any) => upsertGitCourseTopicSubmission(_, args, context),

  addTopic: (_: unknown, args: any, context: any) => addTopicMutation(_, args, context),
  moveTopic: (_: unknown, args: any, context: any) => moveTopicMutation(_, args, context),
  deleteTopic: (_: unknown, args: any, context: any) => deleteTopicMutation(_, args, context),
  updateTopicBasicInfo: (_: unknown, args: any, context: any) => updateTopicBasicInfoMutation(_, args, context),

  addTopicExplanation: (_: unknown, args: any, context: any) => addTopicExplanationMutation(_, args, context),
  addTopicSummary: (_: unknown, args: any, context: any) => addTopicSummaryMutation(_, args, context),
  addTopicVideo: (_: unknown, args: any, context: any) => addTopicVideoMutation(_, args, context),
  addTopicQuestion: (_: unknown, args: any, context: any) => addTopicQuestionMutation(_, args, context),

  deleteTopicExplanation: (_: unknown, args: any, context: any) => deleteTopicExplanationMutation(_, args, context),
  deleteTopicSummary: (_: unknown, args: any, context: any) => deleteTopicSummaryMutation(_, args, context),
  deleteTopicVideo: (_: unknown, args: any, context: any) => deleteTopicVideoMutation(_, args, context),
  deleteTopicQuestion: (_: unknown, args: any, context: any) => deleteTopicQuestionMutation(_, args, context),

  moveTopicExplanation: (_: unknown, args: any, context: any) => moveTopicExplanationMutation(_, args, context),
  moveTopicSummary: (_: unknown, args: any, context: any) => moveTopicSummaryMutation(_, args, context),
  moveTopicVideo: (_: unknown, args: any, context: any) => moveTopicVideoMutation(_, args, context),
  moveTopicQuestion: (_: unknown, args: any, context: any) => moveTopicQuestionMutation(_, args, context),
  updateTopicExplanation: (_: unknown, args: any, context: any) => updateTopicExplanationMutation(_, args, context),
  updateTopicSummary: (_: unknown, args: any, context: any) => updateTopicSummaryMutation(_, args, context),
  updateTopicVideo: (_: unknown, args: any, context: any) => updateTopicVideoMutation(_, args, context),
  updateTopicQuestion: (_: unknown, args: any, context: any) => updateTopicQuestionMutation(_, args, context),

  deleteAndPullCourseRepo,
};
