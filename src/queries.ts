import academyTask from '@/graphql/queries/academyTask/academyTask';
import academyTasks from '@/graphql/queries/academyTask/academyTasks';
import byte from '@/graphql/queries/byte/byte';
import bytes from '@/graphql/queries/byte/bytes';
import gitCourse from '@/graphql/queries/course/gitCourse';
import gitCourseIntegrations from '@/graphql/queries/course/gitCourseIntegrations';
import gitCourseSubmission from '@/graphql/queries/course/gitCourseSubmission';
import gitCourseSummarized from '@/graphql/queries/course/gitCourseSummarized';
import gitTopicSubmissions from '@/graphql/queries/course/gitTopicSubmissions';
import rawGitCourse from '@/graphql/queries/course/rawGitCourse';
import courses from '@/graphql/queries/course/summarizedGitCourses';
import guide from '@/graphql/queries/guide/guide';
import guides from '@/graphql/queries/guide/guides';
import simulation from '@/graphql/queries/simulation/simulation';
import simulations from '@/graphql/queries/simulation/simulations';
import getSpace from '@/graphql/queries/space/getSpace';
import timeline from '@/graphql/queries/timeline/timeline';
import timelines from '@/graphql/queries/timeline/timelines';

export default {
  academyTask,
  academyTasks,

  byte,
  bytes,

  courses,
  gitCourse,
  gitCourseIntegrations,

  gitCourseSubmission,
  gitCourseSummarized,
  rawGitCourse,

  gitTopicSubmissions,

  guide,
  guides,

  simulation,
  simulations,

  timeline,
  timelines,

  space: getSpace,
};
