import academyTask from '@/graphql/queries/academyTask/academyTask';
import academyTasks from '@/graphql/queries/academyTask/academyTasks';
import byte from '@/graphql/queries/byte/byte';
import bytes from '@/graphql/queries/byte/bytes';
import byteSocialShare from '@/graphql/queries/byte/byteSocialShare';
import gitCourse from '@/graphql/queries/course/gitCourse';
import gitCourseIntegrations from '@/graphql/queries/course/gitCourseIntegrations';
import gitCourseSubmission from '@/graphql/queries/course/gitCourseSubmission';
import gitCourseSummarized from '@/graphql/queries/course/gitCourseSummarized';
import gitTopicSubmissions from '@/graphql/queries/course/gitTopicSubmissions';
import rawGitCourse from '@/graphql/queries/course/rawGitCourse';
import rawGitCourses from '@/graphql/queries/course/rawGitCourses';
import courses from '@/graphql/queries/course/summarizedGitCourses';
import consolidatedGuideRating from '@/graphql/queries/guide/consolidatedGuideRating';
import guide from '@/graphql/queries/guide/guide';
import guideRating from '@/graphql/queries/guide/guideRating';
import guideRatings from '@/graphql/queries/guide/guideRatings';
import guides from '@/graphql/queries/guide/guides';
import guideSubmissions from '@/graphql/queries/guide/guideSubmissions';
import discordChannels from '@/graphql/queries/loaders/discord/discordChannels';
import discordMessages from '@/graphql/queries/loaders/discord/discordMessages';
import discordServer from '@/graphql/queries/loaders/discord/discordServer';
import discourseIndexRuns from '@/graphql/queries/loaders/discourse/discourseIndexRuns';
import discoursePostComments from '@/graphql/queries/loaders/discourse/discoursePostComments';
import discoursePosts from '@/graphql/queries/loaders/discourse/discoursePosts';
import simulation from '@/graphql/queries/simulation/simulation';
import simulations from '@/graphql/queries/simulation/simulations';
import getSpace from '@/graphql/queries/space/getSpace';
import route53Records from '@/graphql/queries/space/route53Records';
import spaces from '@/graphql/queries/space/spaces';
import vercelDomainRecords from '@/graphql/queries/space/vercelDomainRecords';
import timeline from '@/graphql/queries/timeline/timeline';
import timelines from '@/graphql/queries/timeline/timelines';

export default {
  academyTask,
  academyTasks,

  byte,
  bytes,

  byteSocialShare,

  courses,
  gitCourse,
  gitCourseIntegrations,

  gitCourseSubmission,
  gitCourseSummarized,
  rawGitCourse,
  rawGitCourses,

  gitTopicSubmissions,

  guide,
  guides,

  guideRating,
  guideRatings,

  guideSubmissions,
  consolidatedGuideRating,

  simulation,
  simulations,

  timeline,
  timelines,

  space: getSpace,
  spaces,
  route53Records,
  vercelDomainRecords,

  discourseIndexRuns,
  discoursePosts,
  discoursePostComments,

  discordServer,
  discordChannels,
  discordMessages,
};
