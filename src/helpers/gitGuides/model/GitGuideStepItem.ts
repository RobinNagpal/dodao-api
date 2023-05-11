import { InputType, QuestionType, UserDiscordConnectType } from '@/deprecatedSchemas/models/enums';

export interface GitGuideStepItem {
  // This is undefined for the old questions. The questions will have to be migrated
  type: InputType | QuestionType | typeof UserDiscordConnectType;
  uuid: string;
}

export type GitUserDiscordConnect = GitGuideStepItem;
