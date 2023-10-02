import { PublishStatus, VisibilityEnum } from '@/deprecatedSchemas/models/enums';
import { ByteStep, MutationSaveByteArgs } from '@/graphql/generated/graphql';
import { transformByteInputSteps } from '@/graphql/mutations/byte/transformByteInputSteps';
import { validateInput } from '@/graphql/mutations/byte/validateByteInput';
import { getSpaceById } from '@/graphql/operations/space';
import { logError } from '@/helpers/adapters/errorLogger';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { prisma } from '@/prisma';
import { Byte } from '@prisma/client';
import { IncomingMessage } from 'http';

export default async function saveByteMutation(_: unknown, { spaceId, input }: MutationSaveByteArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(spaceId);

    checkEditSpacePermission(spaceById, context);

    await validateInput(spaceId, input);

    const steps: ByteStep[] = transformByteInputSteps(input);

    const savedObject: Byte = await prisma.byte.upsert({
      create: {
        ...input,
        steps: steps,
        id: input.id || slugify(input.name),
        spaceId: spaceId,
        visibility: input.visibility || VisibilityEnum.Public,
      },
      update: {
        ...input,
        steps: steps,
        visibility: input.visibility || VisibilityEnum.Public,
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
