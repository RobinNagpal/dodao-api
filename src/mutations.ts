import mutations from '@/graphql/mutations';
import generateSharablePdf from '@/graphql/mutations/byte/generateSharablePdf';
import submitByte from '@/graphql/mutations/byte/submitByte';
import upsertByteSocialShare from '@/graphql/mutations/byte/upsertByteSocialShare';
import createByteCollection from '@/graphql/mutations/byteCollection/createByteCollection';
import deleteByteCollection from '@/graphql/mutations/byteCollection/deleteByteCollection';
import updateByteCollection from '@/graphql/mutations/byteCollection/updateByteCollection';
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
import indexDiscoursePost from '@/graphql/mutations/loaders/discourse/indexDiscoursePost';
import triggerNewDiscourseIndexRun from '@/graphql/mutations/loaders/discourse/triggerNewDiscourseIndexRun';
import createWebsiteScrapingInfo from '@/graphql/mutations/loaders/websiteScrape/createWebsiteScrapingInfo';
import editWebsiteScrapingInfo from '@/graphql/mutations/loaders/websiteScrape/editWebsiteScrapingInfo';
import triggerSiteScrapingRun from '@/graphql/mutations/loaders/websiteScrape/triggerSiteScrapingRun';
import askChatCompletionAI from '@/graphql/mutations/openAI/askChatCompletionAI';
import askCompletionAI from '@/graphql/mutations/openAI/askCompletionAI';
import createSummaryOfContent from '@/graphql/mutations/openAI/createSummaryOfContent';
import downloadAndCleanContent from '@/graphql/mutations/openAI/downloadAndCleanContent';
import extractRelevantTextForTopic from '@/graphql/mutations/openAI/extractRelevantTextForTopic';
import generateImage from '@/graphql/mutations/openAI/generateImage';
import createSpace from '@/graphql/mutations/space/createSpace';
import sendEmail from '@/graphql/mutations/space/sendEmail';
import { updateAuthSettings } from '@/graphql/mutations/space/updateAuthSettings';
import { updateByteSettings } from '@/graphql/mutations/space/updateByteSettings';
import { updateGuideSettings } from '@/graphql/mutations/space/updateGuideSettings';
import { updateSocialSettings } from '@/graphql/mutations/space/updateSocialSettings';
import updateSpace from '@/graphql/mutations/space/updateSpace';
import upsertSpaceLoaderInfo from '@/graphql/mutations/space/upsertSpaceLoaderInfo';

export default {
  askCompletionAI,
  askChatCompletionAI,
  downloadAndCleanContent,
  createSummaryOfContent,
  extractRelevantTextForTopic,
  generateImage,

  createSpace,
  updateSpace,
  sendEmail,

  upsertSpaceLoaderInfo,

  upsertGuideRating,
  generateSharablePdf,
  upsertByteSocialShare,

  updateAuthSettings,
  updateGuideSettings,
  updateSocialSettings,
  updateByteSettings,

  submitByte,
  submitGuide,
  deleteGuide,

  deleteGitCourseSubmission,

  triggerNewDiscourseIndexRun,

  reFetchDiscordServers,
  reFetchDiscordChannels,
  reFetchDiscordMessages,
  updateIndexingOfDiscordChannel,
  indexDiscoursePost,

  createWebsiteScrapingInfo,
  editWebsiteScrapingInfo,
  triggerSiteScrapingRun,

  createArticleIndexingInfo,
  editArticleIndexingInfo,

  createByteCollection,
  deleteByteCollection,
  updateByteCollection,

  ...mutations,
};
