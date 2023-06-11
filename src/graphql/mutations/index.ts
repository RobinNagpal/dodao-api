import byteMutations from '@/graphql/mutations/byte.mutations';
import simulationMutations from '@/graphql/mutations/simulation.mutations';
import byteSubmissionMutations from '@/graphql/mutations/byteSubmission.mutations';
import courseMutations from '@/graphql/mutations/course.mutations';
import courseSubmissionsMutations from '@/graphql/mutations/courseSubmissions.mutations';
import guideMutations from '@/graphql/mutations/guide.mutations';
import guideSubmissionMutations from '@/graphql/mutations/guideSubmission.mutations';
import spaceMutations from '@/graphql/mutations/space.mutations';
import timelineMutations from '@/graphql/mutations/timeline.mutations';
import byteSaveMutation from './byteSave.mutation';
import bytePublishMutation from './bytePublish.mutation';

export default {
  ...byteMutations,
  ...byteSubmissionMutations,
  ...courseMutations,
  ...courseSubmissionsMutations,
  ...guideMutations,
  ...guideSubmissionMutations,
  ...simulationMutations,
  ...spaceMutations,
  ...timelineMutations,
  ...byteSaveMutation,
  ...bytePublishMutation,
};
