import { ByteStepSubmission, ByteSubmission } from '@/graphql/generated/graphql';

export interface ByteSubmissionWithSteps extends ByteSubmission {
  steps: ByteStepSubmission[];
}
