import mutations from '@/graphql/mutations';
import generateSharablePdf from '@/graphql/mutations/byte/generateSharablePdf';
import submitByte from '@/graphql/mutations/byte/submitByte';
import upsertByteSocialShare from '@/graphql/mutations/byte/upsertByteSocialShare';
import deleteGitCourseSubmission from '@/graphql/mutations/course/submission/deleteGitCourseSubmission';
import deleteGuide from '@/graphql/mutations/guide/deleteGuide';
import submitGuide from '@/graphql/mutations/guide/submitGuide';
import upsertGuideRating from '@/graphql/mutations/guide/upsertGuideRating';
import triggerNewDiscourseIndexRun from '@/graphql/mutations/loaders/discourse/triggerNewDiscourseIndexRun';
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

  ...mutations,
};
