import { UserDiscordInfo } from '@/graphql/generated/graphql';

export interface SubmissionItemInfo {
  uuid: string;
  type: string;
  value: string[] | string | UserDiscordInfo | undefined | null;
}

export type UserByteQuestionSubmission = {
  [itemUuid: string]: SubmissionItemInfo;
};

export type UserByteStepSubmission = { [stepUuid: string]: UserByteQuestionSubmission };
