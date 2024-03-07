import mutations from '@/graphql/mutations';
import deleteByte from '@/graphql/mutations/byte/deleteByte';
import generateSharablePdf from '@/graphql/mutations/byte/generateSharablePdf';
import submitByte from '@/graphql/mutations/byte/submitByte';
import upsertByte from '@/graphql/mutations/byte/upsertByte';
import upsertByteSocialShare from '@/graphql/mutations/byte/upsertByteSocialShare';
import createByteCollection from '@/graphql/mutations/byteCollection/createByteCollection';
import deleteByteCollection from '@/graphql/mutations/byteCollection/deleteByteCollection';
import updateByteCollection from '@/graphql/mutations/byteCollection/updateByteCollection';
import deleteChatbotCategory from '@/graphql/mutations/chatbot/deleteChatbotCategory';
import deleteChatbotFAQ from '@/graphql/mutations/chatbot/deleteChatbotFAQ';
import deleteChatbotUserQuestion from '@/graphql/mutations/chatbot/deleteChatbotUserQuestion';
import indexChatbotFAQs from '@/graphql/mutations/chatbot/indexChatbotFAQs';
import upsertChatbotCategory from '@/graphql/mutations/chatbot/upsertChatbotCategory';
import upsertChatbotFAQ from '@/graphql/mutations/chatbot/upsertChatbotFAQ';
import upsertChatbotUserQuestion from '@/graphql/mutations/chatbot/upsertChatbotUserQuestion';
import deleteGitCourseSubmission from '@/graphql/mutations/course/submission/deleteGitCourseSubmission';
import deleteGuide from '@/graphql/mutations/guide/deleteGuide';
import submitGuide from '@/graphql/mutations/guide/submitGuide';
import upsertGuideRating from '@/graphql/mutations/guide/upsertGuideRating';
import createArticleIndexingInfo from '@/graphql/mutations/loaders/article/createArticleIndexingInfo';
import editArticleIndexingInfo from '@/graphql/mutations/loaders/article/editArticleIndexingInfo';
import reFetchDiscordChannels from '@/graphql/mutations/loaders/discord/reFetchDiscordChannels';
import reFetchDiscordMessages from '@/graphql/mutations/loaders/discord/reFetchDiscordMessages';
import reFetchDiscordServers from '@/graphql/mutations/loaders/discord/reFetchDiscordServers';
import updateIndexingOfDiscordChannel from '@/graphql/mutations/loaders/discord/updateIndexingOfDiscordChannel';
import annotateDiscoursePost from '@/graphql/mutations/loaders/discourse/annotateDiscoursePost';
import indexDiscoursePost from '@/graphql/mutations/loaders/discourse/indexDiscoursePost';
import indexNeedsIndexingDiscoursePosts from '@/graphql/mutations/loaders/discourse/indexNeedsIndexingDiscoursePosts';
import triggerNewDiscourseIndexRun from '@/graphql/mutations/loaders/discourse/triggerNewDiscourseIndexRun';
import updateIndexWithAllDiscordPosts from '@/graphql/mutations/loaders/discourse/updateIndexWithAllDiscordPosts';
import upsertSummaryOfDiscoursePost from '@/graphql/mutations/loaders/discourse/upsertSummaryOfDiscoursePost';
import createWebsiteScrapingInfo from '@/graphql/mutations/loaders/websiteScrape/createWebsiteScrapingInfo';
import editWebsiteScrapingInfo from '@/graphql/mutations/loaders/websiteScrape/editWebsiteScrapingInfo';
import triggerSiteScrapingRun from '@/graphql/mutations/loaders/websiteScrape/triggerSiteScrapingRun';
import askChatCompletionAI from '@/graphql/mutations/openAI/askChatCompletionAI';
import askCompletionAI from '@/graphql/mutations/openAI/askCompletionAI';
import createSummaryOfContent from '@/graphql/mutations/openAI/createSummaryOfContent';
import downloadAndCleanContent from '@/graphql/mutations/openAI/downloadAndCleanContent';
import extractRelevantTextForTopic from '@/graphql/mutations/openAI/extractRelevantTextForTopic';
import generateImage from '@/graphql/mutations/openAI/generateImage';
import updateArchivedStatusOfProject from '@/graphql/mutations/project/updateArchivedStatusOfProject';
import updateArchivedStatusOfProjectByte from '@/graphql/mutations/project/updateArchivedStatusOfProjectByte';
import updateArchivedStatusOfProjectByteCollection from '@/graphql/mutations/project/updateArchivedStatusOfProjectByteCollection';
import updateArchivedStatusOfProjectShortVideo from '@/graphql/mutations/project/updateArchivedStatusOfProjectShortVideo';
import upsertProject from '@/graphql/mutations/project/upsertProject';
import upsertProjectByte from '@/graphql/mutations/project/upsertProjectByte';
import upsertProjectByteCollection from '@/graphql/mutations/project/upsertProjectByteCollection';
import upsertProjectShortVideo from '@/graphql/mutations/project/upsertProjectShortVideo';
import upsertShortVideo from '@/graphql/mutations/shortVideo/upsertShortVideo';
import createNewTidbitSpace from '@/graphql/mutations/space/createNewTidbitSpace';
import createSpace from '@/graphql/mutations/space/createSpace';
import { dropPineconeNamespace } from '@/graphql/mutations/space/dropPineconeNamespace';
import sendEmail from '@/graphql/mutations/space/sendEmail';
import { updateAuthSettings } from '@/graphql/mutations/space/updateAuthSettings';
import { updateByteSettings } from '@/graphql/mutations/space/updateByteSettings';
import { updateGuideSettings } from '@/graphql/mutations/space/updateGuideSettings';
import { updateSocialSettings } from '@/graphql/mutations/space/updateSocialSettings';
import updateSpace from '@/graphql/mutations/space/updateSpace';
import upsertDomainRecords from '@/graphql/mutations/space/upsertDomainRecords';
import upsertRoute53Record from '@/graphql/mutations/space/upsertRoute53Record';
import upsertSpaceLoaderInfo from '@/graphql/mutations/space/upsertSpaceLoaderInfo';
import upsertVercelDomainRecord from '@/graphql/mutations/space/upsertVercelDomainRecord';
import updateSpaceCreator from './graphql/mutations/space/updateSpaceCreator';
import updateThemeColors from './graphql/mutations/space/updateThemeColors';
import updateSeoOfProject from './graphql/mutations/project/updateSeoOfProject';
import updateSeoOfProjectByte from './graphql/mutations/project/updateSeoOfProjectByte';
import updateSeoOfProjectByteCollection from './graphql/mutations/project/updateSeoOfProjectByteCollection';
import updateSeoOfProjectShortVideo from './graphql/mutations/project/updateSEOOfProjectShortVideo';

export default {
  askCompletionAI,
  askChatCompletionAI,
  downloadAndCleanContent,
  createSummaryOfContent,
  extractRelevantTextForTopic,
  generateImage,

  createSpace,
  createNewTidbitSpace,
  updateSpace,
  updateSpaceCreator,
  sendEmail,
  dropPineconeNamespace,

  upsertSpaceLoaderInfo,

  upsertGuideRating,
  generateSharablePdf,
  upsertByteSocialShare,

  updateAuthSettings,
  updateGuideSettings,
  updateSocialSettings,
  updateByteSettings,

  upsertByte,
  submitByte,
  deleteByte,

  submitGuide,
  deleteGuide,

  deleteGitCourseSubmission,

  triggerNewDiscourseIndexRun,
  indexNeedsIndexingDiscoursePosts,
  updateIndexWithAllDiscordPosts,

  reFetchDiscordServers,
  reFetchDiscordChannels,
  reFetchDiscordMessages,
  updateIndexingOfDiscordChannel,
  indexDiscoursePost,
  annotateDiscoursePost,
  upsertSummaryOfDiscoursePost,

  createWebsiteScrapingInfo,
  editWebsiteScrapingInfo,
  triggerSiteScrapingRun,

  createArticleIndexingInfo,
  editArticleIndexingInfo,

  createByteCollection,
  deleteByteCollection,
  updateByteCollection,

  upsertProject,
  upsertProjectByte,
  upsertProjectByteCollection,
  upsertProjectShortVideo,
  updateArchivedStatusOfProject,
  updateArchivedStatusOfProjectByte,
  updateArchivedStatusOfProjectByteCollection,
  updateArchivedStatusOfProjectShortVideo,
  updateSeoOfProject,
  updateSeoOfProjectByte,
  updateSeoOfProjectByteCollection,
  updateSeoOfProjectShortVideo,

  indexChatbotFAQs,
  upsertChatbotFAQ,
  upsertChatbotUserQuestion,
  upsertChatbotCategory,

  deleteChatbotFAQ,
  deleteChatbotUserQuestion,
  deleteChatbotCategory,

  upsertShortVideo,

  updateThemeColors,

  upsertRoute53Record,
  upsertVercelDomainRecord,
  upsertDomainRecords,

  ...mutations,
};
