import academyTask from '@/graphql/queries/academyTask/academyTask';
import academyTasks from '@/graphql/queries/academyTask/academyTasks';
import byte from '@/graphql/queries/byte/byte';
import bytes from '@/graphql/queries/byte/bytes';
import byteRating from '@/graphql/queries/byte/byteRating';
import byteRatings from '@/graphql/queries/byte/byteRatings';
import consolidatedByteRating from '@/graphql/queries/byte/consolidatedByteRating';
import byteSocialShare from '@/graphql/queries/byte/byteSocialShare';
import consolidatedByteRatingsForSpace from '@/graphql/queries/byte/consolidatedByteRatingsForSpace';
import byteCollection from '@/graphql/queries/byteCollection/byteCollection';
import byteCollections from '@/graphql/queries/byteCollection/byteCollections';
import consolidatedGuideRatingsForSpace from '@/graphql/queries/guide/consolidatedGuideRatingsForSpace';
import byteCollectionCategories from './graphql/queries/byteCollectionCategory/byteCollectionCategories';
import byteCollectionCategoryWithByteCollections from './graphql/queries/byteCollectionCategory/byteCollectionCategoryWithByteCollections';
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
import articleIndexingInfo from '@/graphql/queries/loaders/article/articleIndexingInfo';
import articleIndexingInfos from '@/graphql/queries/loaders/article/articleIndexingInfos';
import discordChannels from '@/graphql/queries/loaders/discord/discordChannels';
import discordMessages from '@/graphql/queries/loaders/discord/discordMessages';
import discordServer from '@/graphql/queries/loaders/discord/discordServer';
import discourseIndexRuns from '@/graphql/queries/loaders/discourse/discourseIndexRuns';
import discoursePostComments from '@/graphql/queries/loaders/discourse/discoursePostComments';
import discoursePosts from '@/graphql/queries/loaders/discourse/discoursePosts';
import scrapedUrlInfo from '@/graphql/queries/loaders/websiteScrape/scrapedUrlInfo';
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
import getSpaceFromCreator from './graphql/queries/space/getSpaceFromCreator';
import route53Record from '@/graphql/queries/space/route53Record';
import spaces from '@/graphql/queries/space/spaces';
import vercelDomainRecord from '@/graphql/queries/space/vercelDomainRecord';
import timeline from '@/graphql/queries/timeline/timeline';
import timelines from '@/graphql/queries/timeline/timelines';
import clickableDemos from '@/graphql/queries/clickableDemos/clickableDemos';
import clickableDemoWithSteps from '@/graphql/queries/clickableDemos/clickableDemoWithSteps';

export default {
  academyTask,
  academyTasks,

  byte,
  bytes,

  byteRating,
  byteRatings,
  consolidatedByteRating,
  consolidatedByteRatingsForSpace,

  byteSocialShare,

  byteCollectionCategories,
  byteCollectionCategoryWithByteCollections,

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
  consolidatedGuideRatingsForSpace,

  simulation,
  simulations,

  timeline,
  timelines,

  space: getSpace,
  spaces,
  route53Record,
  vercelDomainRecord,
  getSpaceFromCreator,

  discourseIndexRuns,
  discoursePosts,
  discoursePostComments,

  discordServer,
  discordChannels,
  discordMessages,

  websiteScrapingInfos,
  siteScrapingRuns,
  scrapedUrlInfos,
  scrapedUrlInfo,

  articleIndexingInfos,
  articleIndexingInfo,

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

  clickableDemos,
  clickableDemoWithSteps,
};
