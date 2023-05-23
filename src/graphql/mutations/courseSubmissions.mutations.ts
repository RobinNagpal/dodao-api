import initializeGitCourseSubmissionMutation from '@/graphql/mutations/course/submission/initializeGitCourseSubmissionMutation';
import submitGitCourseMutation from '@/graphql/mutations/course/submission/submitGitCourseMutation';
import submitGitCourseTopicMutation from '@/graphql/mutations/course/submission/submitGitCourseTopicMutation';

export default {
  submitGitCourseTopic: (_: unknown, args: any, context: any) => submitGitCourseTopicMutation(_, args, context),
  initializeGitCourseSubmission: (_: unknown, args: any, context: any) => initializeGitCourseSubmissionMutation(_, args, context),
  submitGitCourse: (_: unknown, args: any, context: any) => submitGitCourseMutation(_, args, context),
};
