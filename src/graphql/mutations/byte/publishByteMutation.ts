import { prisma } from '@/prisma';
import { ByteModel } from '@/deprecatedSchemas/models/byte/ByteModel';
import { PublishStatus } from '@/deprecatedSchemas/models/enums';
import { MutationPublishByteArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { writeObjectToAcademyRepo } from '@/helpers/academy/writers/academyObjectWriter';
import { logError } from '@/helpers/adapters/errorLogger';
//import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
//import { slugify } from '@/helpers/space/slugify';
import { IncomingMessage } from 'http';

// Implement these functions as per your requirements
async function getByteById(byteId: string): Promise<ByteModel> {
  const byte = await prisma.byte.findUnique({
    where: { idx: byteId },
    include: { steps: true }, // Include the associated ByteSteps in the query result
  });

  if (!byte) {
    throw new Error('Byte not found');
  }

  // Map the Prisma Byte and ByteStep entities to a ByteModel object
  const byteModel: ByteModel = {
    ...byte, // spread the rest of the properties
    steps: byte.steps.map((s) => ({
      ...s,
      stepItems: typeof s.stepItems === 'string' ? JSON.parse(s.stepItems) : [], // parse only if it's a string
    })),
    publishStatus: byte.publishStatus as PublishStatus, //cast string to PublishStatus
  };

  return byteModel;
}

async function saveObjectToDb(spaceId: string, byte: ByteModel) {
  return prisma.byte.update({
    where: { idx: byte.id },
    data: { publishStatus: PublishStatus.Live },
  });
}

export default async function publishByteMutation(_: unknown, { spaceId, byteId }: MutationPublishByteArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(spaceId);
    //const decodedJwt = checkEditSpacePermission(spaceById, context);

    // Fetch the Byte that should be published
    const byte = await getByteById(byteId);

    // Update the publishStatus to 'live'
    byte.publishStatus = PublishStatus.Live;

    // Save the updated Byte to the database
    await saveObjectToDb(spaceId, byte);

    // Write the updated Byte to the Academy Repo
    await writeObjectToAcademyRepo(spaceById, byte, AcademyObjectTypes.bytes, '123456789');

    return byte; // return the updated Byte
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in publishByte', {}, e as any, null, null);
    throw e;
  }
}
