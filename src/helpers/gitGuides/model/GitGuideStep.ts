import { GitUserDiscordConnect } from '@/helpers/gitGuides/model/GitGuideStepItem';
import { GitGuideQuestion } from './GitGuideQuestion';
import { GitUserInput } from './GitUserInput';

export interface GitGuideStep {
  content: string;
  name: string;
  stepItems: (GitGuideQuestion | GitUserInput | GitUserDiscordConnect)[];
  uuid: string;
}
