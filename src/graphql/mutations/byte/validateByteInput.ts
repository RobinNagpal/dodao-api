import { ByteQuestion } from '@/deprecatedSchemas/models/byte/ByteModel';
import { QuestionType } from '@/deprecatedSchemas/models/enums';
import { ByteStepItem, UpsertByteInput } from '@/graphql/generated/graphql';
import { v4 as uuidv4 } from 'uuid';

export function validateInput(spaceId: string, message: UpsertByteInput): void {
  // remove the order and add id if needed
  message.steps.map((s, i) => ({
    ...s,
    order: undefined,
    uuid: uuidv4(), // generate new uuid for each step
    stepItems: ((s.stepItems || []) as ByteStepItem[]).map((si, order) => {
      if (si.type === QuestionType.MultipleChoice || si.type === QuestionType.SingleChoice) {
        const question = si as ByteQuestion;
        if (!question.explanation) {
          throw Error(`explanation is missing in byte question - ${spaceId} - ${message.name}`);
        }
      }
    }),
  }));
}
