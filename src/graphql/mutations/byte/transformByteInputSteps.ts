import { isQuestion, isUserDiscordConnect, isUserInput } from '@/deprecatedSchemas/helpers/stepItemTypes';
import { ByteQuestion } from '@/deprecatedSchemas/models/byte/ByteModel';
import { ByteStepInput, ByteStepItem, ByteUserInput, UpsertByteInput, UserDiscordConnect } from '@/graphql/generated/graphql';

export function transformByteInputSteps(input: UpsertByteInput) {
  return input.steps.map((s: ByteStepInput, i) => {
    const stepItems: ByteStepItem[] = s.stepItems.map((si, order): ByteQuestion | ByteUserInput | UserDiscordConnect => {
      if (isQuestion(si)) {
        return si as ByteQuestion;
      }

      if (isUserInput(si)) {
        return si as ByteUserInput;
      }

      if (isUserDiscordConnect(si)) {
        return si as UserDiscordConnect;
      }

      throw new Error(`Unknown step item type ${si.type}`);
    });
    return { ...s, stepItems: stepItems };
  });
}
