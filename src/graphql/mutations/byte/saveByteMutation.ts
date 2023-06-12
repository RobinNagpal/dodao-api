import { isQuestion, isUserDiscordConnect, isUserInput } from '@/deprecatedSchemas/helpers/stepItemTypes';
import { ByteQuestion } from '@/deprecatedSchemas/models/byte/ByteModel';
import { PublishStatus, QuestionType } from '@/deprecatedSchemas/models/enums';
import { ByteStepInput, ByteStepItem, ByteUserInput, MutationSaveByteArgs, UpsertByteInput, UserDiscordConnect } from '@/graphql/generated/graphql';
import { logError } from '@/helpers/adapters/errorLogger';
import { slugify } from '@/helpers/space/slugify';
import { prisma } from '@/prisma';
import { ByteStep } from '@/types/bytes/ByteStep';
import { Byte } from '@prisma/client';
import { IncomingMessage } from 'http';
import { v4 as uuidv4 } from 'uuid';

function validateInput(spaceId: string, message: UpsertByteInput): void {
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

export default async function saveByteMutation(_: unknown, { spaceId, input }: MutationSaveByteArgs, context: IncomingMessage) {
  try {
    const spaceById = await prisma.space.findUnique({ where: { id: spaceId } });
    if (!spaceById) {
      throw new Error('Space not found');
    }

    await validateInput(spaceId, input);

    const steps: ByteStep[] = input.steps.map((s: ByteStepInput, i) => {
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

    const savedObject: Byte = await prisma.byte.upsert({
      create: {
        ...input,
        steps: steps,
        id: input.id || slugify(input.name),
        spaceId: spaceId,
      },
      update: {
        ...input,
        steps: steps,
      },
      where: {
        id_publishStatus: {
          id: input.id!,
          publishStatus: PublishStatus.Draft,
        },
      },
    });
    return savedObject;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in saveByte', {}, e as any, null, null);
    throw e;
  }
}
