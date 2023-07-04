import mutations from '@/graphql/mutations';
import upsertGuideRating from '@/graphql/mutations/guide/upsertGuideRating';
import askChatCompletionAI from '@/graphql/mutations/openAI/askChatCompletionAI';
import askCompletionAI from '@/graphql/mutations/openAI/askCompletionAI';
import createSummaryOfContent from '@/graphql/mutations/openAI/createSummaryOfContent';
import downloadAndCleanContent from '@/graphql/mutations/openAI/downloadAndCleanContent';
import extractRelevantTextForTopic from '@/graphql/mutations/openAI/extractRelevantTextForTopic';
import generateImage from '@/graphql/mutations/openAI/generateImage';
import createSpace from '@/graphql/mutations/space/createSpace';
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

  ...mutations,
};
