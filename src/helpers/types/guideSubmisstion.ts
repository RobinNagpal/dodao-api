import { UserDiscordInfo } from '@/graphql/generated/graphql';

export interface SubmissionItemInfo {
  type: string;
  value: string[] | string | UserDiscordInfo | undefined | null;
}

export type UserGuideQuestionSubmission = {
  [itemUuid: string]: SubmissionItemInfo;
};

export type UserGuideStepSubmission = { [stepUuid: string]: UserGuideQuestionSubmission };
