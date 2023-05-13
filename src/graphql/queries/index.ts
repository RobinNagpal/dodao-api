import academyTask from './academyTask/academyTask';
import academyTasks from './academyTask/academyTasks';
import byte from './byte/byte';
import bytes from './byte/bytes';
import simulation from './simulation/simulation';
import simulations from './simulation/simulations';
import courses from './course/courses';
import gitCourse from './course/gitCourse';
import gitCourseSubmission from './course/gitCourseSubmission';
import gitCourseSummarized from './course/gitCourseSummarized';
import gitTopicSubmissions from './course/gitTopicSubmissions';
import gitCourseIntegrations from './course/gitCourseIntegrations';
import rawGitCourse from './course/rawGitCourse';
import summarizedGitCourses from './course/summarizedGitCourses';
import getSpace from './space/getSpace';

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
  summarizedGitCourses,

  gitTopicSubmissions,

  simulation,
  simulations,

  space: getSpace,
};
