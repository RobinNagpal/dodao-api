import { MutationGenerateSharablePdfArgs } from '@/graphql/generated/graphql';
import downloadImageToTempLocation from '@/graphql/mutations/share/downloadImageToTempLocation';
import { writeTextToPdf } from '@/graphql/mutations/share/textOnImage';
import { getSpaceById } from '@/graphql/operations/space';
import { AcademyObjectTypes } from '@/helpers/academy/academyObjectTypes';
import { getAcademyObjectFromRedis } from '@/helpers/academy/readers/academyObjectReader';
import { uploadFileToS3 } from '@/helpers/s3/uploadFileToS3';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { slugify } from '@/helpers/space/slugify';
import { Byte, Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import os from 'os';
import path from 'path';

export default async function generateSharablePdf(_: unknown, args: MutationGenerateSharablePdfArgs, context: IncomingMessage): Promise<string> {
  const spaceById: Space = await getSpaceById(args.spaceId);
  const jwt = checkEditSpacePermission(spaceById, context);

  if (!spaceById.socialSettings.linkedSharePdfBackgroundImage) {
    throw new Error('No background image set for this space');
  }
  const byte = (await getAcademyObjectFromRedis(args.spaceId, AcademyObjectTypes.bytes, args.byteId)) as Byte | undefined;

  if (!byte) {
    throw new Error('Byte not found');
  }

  const backgroundImageUrl = await downloadImageToTempLocation(spaceById.socialSettings.linkedSharePdfBackgroundImage);

  const filename = 'byte-' + slugify(byte.name) + '.pdf';
  const tmpPdfFilePath = path.join(os.tmpdir(), filename);

  const pdfContents = byte.steps
    .filter((s) => s.content.trim().length > 20)
    .map((s) => ({
      title: s.name,
      content: s.content,
    }));

  await writeTextToPdf(backgroundImageUrl, pdfContents, tmpPdfFilePath);

  const s3Key = `academy/${spaceById.id}/Social/${AcademyObjectTypes.bytes}/${filename}`;

  return await uploadFileToS3(s3Key, 'application/pdf', tmpPdfFilePath);
}
