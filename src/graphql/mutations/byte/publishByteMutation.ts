import { ByteStep, MutationPublishByteArgs, UpsertByteInput } from '@/graphql/generated/graphql';
import { transformByteInputSteps } from '@/graphql/mutations/byte/transformByteInputSteps';
import { validateInput } from '@/graphql/mutations/byte/validateByteInput';
import { getByte } from '@/graphql/queries/byte/byte';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { writeObjectToAcademyRepo } from '@/helpers/academy/writers/academyObjectWriter';
import { logError } from '@/helpers/adapters/errorLogger';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
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
    const existingLiveByte = await getByte(spaceId, input.id!);

    let savedByte;

    /*
    if (existingLiveByte) {
      savedByte = await prisma.byte.update({
        where: {
          id_publishStatus: {
            id: input.id!,
            publishStatus: PublishStatus.Live,
          },
        },
        data: {
          ...input,
          steps: steps,
          publishStatus: PublishStatus.Live,
          visibility: input.visibility || VisibilityEnum.Public,
        },
      });

      await prisma.byte.delete({ where: { id_publishStatus: { id: input.id!, publishStatus: PublishStatus.Draft } } });
    } else {
      savedByte = await prisma.byte.upsert({
        create: {
          ...input,
          steps: steps,
          id: input.id || slugify(input.name),
          spaceId: spaceId,
          publishStatus: PublishStatus.Live,
          visibility: input.visibility || VisibilityEnum.Public,
        },
        update: {
          ...input,
          steps: steps,
          publishStatus: PublishStatus.Live,
          visibility: input.visibility || VisibilityEnum.Public,
        },
        where: {
          id_publishStatus: {
            id: input.id!,
            publishStatus: PublishStatus.Draft,
          },
        },
      });
    }
*/

    const newByte = await writeObjectToAcademyRepo(spaceById, existingLiveByte, AcademyObjectTypes.bytes, jwt.accountId);

    return newByte;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in publishByte', {}, e as any, null, null);
    throw e;
  }
}
