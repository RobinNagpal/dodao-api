import { GuideStepSubmission, GuideSubmission } from '@/graphql/generated/graphql';

export interface GuideSubmissionWithSteps extends GuideSubmission {
  steps: GuideStepSubmission[];
}
