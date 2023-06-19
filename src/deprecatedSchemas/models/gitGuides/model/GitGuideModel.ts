import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { GuideType } from '@/deprecatedSchemas/models/GuideModel';
import { GitGuideIntegrations } from './GitGuideIntegrations';
import { GitGuideStep } from './GitGuideStep';

export interface GitGuideModel {
  categories: string[];
  content: string;
  created: string;
  guideIntegrations?: GitGuideIntegrations;
  guideType: GuideType;
  key: string;
  name: string;
  postSubmissionStepContent?: string;
  publishStatus: PublishStatus;
  showIncorrectOnCompletion: boolean;
  socialShareImage?: string;
  steps: GitGuideStep[];
  thumbnail: string;
  uuid: string;
  version?: number;
}
