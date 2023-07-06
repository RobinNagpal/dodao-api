import mutations from '@/graphql/mutations';
import generateSharablePdf from '@/graphql/mutations/byte/generateSharablePdf';
import upsertGuideRating from '@/graphql/mutations/guide/upsertGuideRating';
import askChatCompletionAI from '@/graphql/mutations/openAI/askChatCompletionAI';
import askCompletionAI from '@/graphql/mutations/openAI/askCompletionAI';
import createSummaryOfContent from '@/graphql/mutations/openAI/createSummaryOfContent';
import downloadAndCleanContent from '@/graphql/mutations/openAI/downloadAndCleanContent';
import extractRelevantTextForTopic from '@/graphql/mutations/openAI/extractRelevantTextForTopic';
import generateImage from '@/graphql/mutations/openAI/generateImage';
import createSpace from '@/graphql/mutations/space/createSpace';
import { updateAuthSettings } from '@/graphql/mutations/space/updateAuthSettings';
import { updateGuideSettings } from '@/graphql/mutations/space/updateGuideSettings';
import { updateSocialSettings } from '@/graphql/mutations/space/updateSocialSettings';
import updateSpace from '@/graphql/mutations/space/updateSpace';

export default {
  askCompletionAI,
  askChatCompletionAI,
  downloadAndCleanContent,
  createSummaryOfContent,
  extractRelevantTextForTopic,
  generateImage,

  createSpace,
  updateSpace,

  upsertGuideRating,
  generateSharablePdf,

  updateAuthSettings,
  updateGuideSettings,
  updateSocialSettings,

  ...mutations,
};
