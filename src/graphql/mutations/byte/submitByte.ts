import { ByteModel } from '@/deprecatedSchemas/models/byte/ByteModel';
import { MutationSubmitByteArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { getByte } from '@/graphql/queries/byte/byte';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';
import { postByteSubmission } from '@/helpers/discord/webhookMessage';
import { getOptioanlJwt } from '@/helpers/permissions/getJwtFromContext';
import { prisma } from '@/prisma';
import { GraphqlContext } from '@/types/GraphqlContext';

export default async function submitByte(_: unknown, byteInput: MutationSubmitByteArgs, context: GraphqlContext) {
  const space = await getSpaceById(byteInput.submissionInput.space);
  const decodedJWT = getOptioanlJwt(context);
  const user = decodedJWT?.username.toLowerCase();

  const byte: ByteModel | undefined = await getByte(space.id, byteInput.submissionInput.byteId);

  if (!byte) {
    throw new Error(`No byte found with uuid ${byteInput.submissionInput.byteId}`);
  }

  const submission = await prisma.byteSubmission.create({
    data: {
      id: byteInput.submissionInput.uuid,
      createdBy: user || 'anonymous',
      byteId: byte.id,
      spaceId: space.id,
      ipAddress: context.ip,
      created: new Date().toISOString(),
    },
  });

  if (process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK) {
    postByteSubmission(process.env.ALL_GUIDE_SUBMISSIONS_WEBHOOK, byte, byteInput.submissionInput);
  }

  return submission;
}
