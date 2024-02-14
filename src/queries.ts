import academyTask from '@/graphql/queries/academyTask/academyTask';
import academyTasks from '@/graphql/queries/academyTask/academyTasks';
import byte from '@/graphql/queries/byte/byte';
import bytes from '@/graphql/queries/byte/bytes';
import byteSocialShare from '@/graphql/queries/byte/byteSocialShare';
import byteCollection from '@/graphql/queries/byteCollection/byteCollection';
import byteCollections from '@/graphql/queries/byteCollection/byteCollections';
import chatbotCategories from '@/graphql/queries/chatbot/chatbotCategories';
import chatbotFAQs from '@/graphql/queries/chatbot/chatbotFAQs';
import chatbotUserQuestions from '@/graphql/queries/chatbot/chatbotUserQuestions';
import searchChatbotFAQs from '@/graphql/queries/chatbot/searchChatbotFAQs';
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
import articleIndexingInfos from '@/graphql/queries/loaders/article/articleIndexingInfos';
import discordChannels from '@/graphql/queries/loaders/discord/discordChannels';
import discordMessages from '@/graphql/queries/loaders/discord/discordMessages';
import discordServer from '@/graphql/queries/loaders/discord/discordServer';
import discourseIndexRuns from '@/graphql/queries/loaders/discourse/discourseIndexRuns';
import discoursePostComments from '@/graphql/queries/loaders/discourse/discoursePostComments';
import discoursePosts from '@/graphql/queries/loaders/discourse/discoursePosts';
import scrapedUrlInfos from '@/graphql/queries/loaders/websiteScrape/scrapedUrlInfos';
import siteScrapingRuns from '@/graphql/queries/loaders/websiteScrape/siteScrapingRuns';
import websiteScrapingInfos from '@/graphql/queries/loaders/websiteScrape/websiteScrapingInfos';
import project from '@/graphql/queries/project/project';
import projectByte from '@/graphql/queries/project/projectByte';
import projectByteCollection from '@/graphql/queries/project/projectByteCollection';
import projectByteCollections from '@/graphql/queries/project/projectByteCollections';
import projectBytes from '@/graphql/queries/project/projectBytes';
import projects from '@/graphql/queries/project/projects';
import projectShortVideo from '@/graphql/queries/project/projectShortVideo';
import projectShortVideos from '@/graphql/queries/project/projectShortVideos';
import shortVideos from '@/graphql/queries/shortVideo/shortVideos';
import shortVideo from './graphql/queries/shortVideo/shortVideo';
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

  websiteScrapingInfos,
  siteScrapingRuns,
  scrapedUrlInfos,

  articleIndexingInfos,

  byteCollections,
  byteCollection,

  project,
  projects,
  projectByte,
  projectBytes,
  projectByteCollection,
  projectByteCollections,
  projectShortVideo,
  projectShortVideos,

  chatbotCategories,
  chatbotFAQs,
  searchChatbotFAQs,
  chatbotUserQuestions,

  shortVideos,
  shortVideo,
};
