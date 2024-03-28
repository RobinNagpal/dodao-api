import { MutationCreateSignedUrlArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { logError } from '@/helpers/adapters/errorLogger';
import { PredefinedSpaces } from '@/helpers/chat/utils/app/constants';
import { presignedUrlCreator } from '@/helpers/s3/getPresignedUrl';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { IncomingMessage } from 'http';

export default async function createSignedUrlMutation(_: unknown, args: MutationCreateSignedUrlArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(args.spaceId);

    // Check if the space is not TIDBITS_HUB as it is used to add logos for new tidbit sites
    if (spaceById.id !== PredefinedSpaces.TIDBITS_HUB) {
      checkEditSpacePermission(spaceById, context);
    }

    return await presignedUrlCreator.createSignedUrl(spaceById.id, args.input);
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in createSignedUrlMutation', {}, e as any, null, null);
    throw e;
  }
}
