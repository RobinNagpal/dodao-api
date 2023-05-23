import { MutationCreateSignedUrlArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { logError } from '@/helpers/adapters/errorLogger';
import { presignedUrlCreator } from '@/helpers/getPresignedUrl';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { IncomingMessage } from 'http';

export default async function createSignedUrlMutation(_: unknown, args: MutationCreateSignedUrlArgs, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(args.spaceId);
    if (!spaceById) throw new Error(`No space found: ${args.spaceId}`);

    checkEditSpacePermission(spaceById, context.headers?.authorization?.replace('Bearer ', '') || '');

    return await presignedUrlCreator.createSignedUrl(spaceById.id, args.input);
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in createSignedUrlMutation', {}, e as any, null, null);
    throw e;
  }
}
