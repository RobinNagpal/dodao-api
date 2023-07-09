import { ByteModel } from '@/deprecatedSchemas/models/byte/ByteModel';
import { MutationSubmitByteArgs } from '@/graphql/generated/graphql';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';
import { postByteSubmission } from '@/helpers/discord/webhookMessage';
import { getOptioanlJwt } from '@/helpers/permissions/getJwtFromContext';
import { prisma } from '@/prisma';
import { GraphqlContext } from '@/types/GraphqlContext';

export default async function submitByteMutation(_: unknown, byteInput: MutationSubmitByteArgs, context: GraphqlContext) {
  const space = await prisma.space.findUniqueOrThrow({
    where: {
      id: byteInput.submissionInput.space,
    },
  });
  const decodedJWT = getOptioanlJwt(context);
  const user = decodedJWT?.accountId.toLowerCase();

  // eslint-disable-next-line no-undef
  const byte: ByteModel | undefined = await getAcademyObjectFromRedis(space.id, AcademyObjectTypes.bytes, byteInput.submissionInput.byteId);

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
