import byteMutations from '@/graphql/mutations/byte.mutations';
import simulationMutations from '@/graphql/mutations/simulation.mutations';
import courseMutations from '@/graphql/mutations/course.mutations';
import courseSubmissionsMutations from '@/graphql/mutations/courseSubmissions.mutations';
import guideMutations from '@/graphql/mutations/guide.mutations';
import spaceMutations from '@/graphql/mutations/space.mutations';
import timelineMutations from '@/graphql/mutations/timeline.mutations';
import bytePublishMutation from './bytePublish.mutation';

export default {
  ...byteMutations,
  ...courseMutations,
  ...courseSubmissionsMutations,
  ...guideMutations,
  ...simulationMutations,
  ...spaceMutations,
  ...timelineMutations,
  ...bytePublishMutation,
};
