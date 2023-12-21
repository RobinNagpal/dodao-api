import { PublishStatus, VisibilityEnum } from '@/deprecatedSchemas/models/enums';
import { ByteStep, MutationPublishByteArgs, UpsertByteInput } from '@/graphql/generated/graphql';
import { transformByteInputSteps } from '@/graphql/mutations/byte/transformByteInputSteps';
import { validateInput } from '@/graphql/mutations/byte/validateByteInput';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { writeObjectToAcademyRepo } from '@/helpers/academy/writers/academyObjectWriter';
import { logError } from '@/helpers/adapters/errorLogger';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function publishByteMutation(
  _: unknown,
  { spaceId, input }: MutationPublishByteArgs & { input: UpsertByteInput },
  context: IncomingMessage,
) {
  try {
    const spaceById = await prisma.space.findUnique({ where: { id: spaceId } });
    if (!spaceById) {
      throw new Error('Space not found');
    }

    const jwt = checkEditSpacePermission(spaceById, context);
    await validateInput(spaceId, input);

    const steps: ByteStep[] = transformByteInputSteps(input);

    const id = input.id || slugify(input.name);
    const upsertedByte = await prisma.byte.upsert({
      create: {
        ...input,
        steps: steps,
        id: id,
        spaceId: spaceId,
        publishStatus: PublishStatus.Live,
        visibility: VisibilityEnum.Public,
      },
      update: {
        ...input,
        steps: steps,
        publishStatus: PublishStatus.Live,
        visibility: VisibilityEnum.Public,
      },
      where: {
        id: id,
      },
    });

    await writeObjectToAcademyRepo(spaceById, upsertedByte, AcademyObjectTypes.bytes, jwt.accountId);

    return upsertedByte;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in publishByte', {}, e as any, null, null);
    throw e;
  }
}
