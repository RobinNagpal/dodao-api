import { MutationUploadImageFromUrlToS3Args } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { logError } from '@/helpers/adapters/errorLogger';
import { presignedUrlCreator } from '@/helpers/s3/getPresignedUrl';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import axios from 'axios';
import { IncomingMessage } from 'http';

function getUploadedImageUrlFromSingedUrl(signedUrl: string) {
  return signedUrl
    ?.replace('https://dodao-prod-public-assets.s3.amazonaws.com', 'https://d31h13bdjwgzxs.cloudfront.net')
    ?.replace('https://dodao-prod-public-assets.s3.us-east-1.amazonaws.com', 'https://d31h13bdjwgzxs.cloudfront.net')
    ?.split('?')[0];
}

export default async function createSignedUrlMutation(_: unknown, args: MutationUploadImageFromUrlToS3Args, context: IncomingMessage) {
  try {
    const spaceById = await getSpaceById(args.spaceId);

    checkEditSpacePermission(spaceById, context);

    const file = await axios.get(args.input.imageUrl, { responseType: 'arraybuffer' });

    const signedUrl = await presignedUrlCreator.createSignedUrl(spaceById.id, args.input);
    await axios.put(signedUrl, file, {
      headers: { 'Content-Type': file.type },
    });

    const url = getUploadedImageUrlFromSingedUrl(signedUrl);
    return url;
  } catch (e) {
    await logError((e as any)?.response?.data || 'Error in createSignedUrlMutation', {}, e as any, null, null);
    throw e;
  }
}
