import { MutationUpsertByteSocialShareArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { ByteSocialShare } from '@prisma/client';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export default async function upsertByteSocialShare(_: unknown, { spaceId, input }: MutationUpsertByteSocialShareArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(spaceId);
  const decodedJwt = checkEditSpacePermission(spaceById, context);

  const savedObject: ByteSocialShare = await prisma.byteSocialShare.upsert({
    create: {
      uuid: v4(),
      byteId: input.byteId,
      spaceId: spaceId,
      linkedinPdfContent: input.linkedinPdfContent || undefined,
      linkedInImages: input.linkedInImages || undefined,
      linkedInPdf: input.linkedInPdf || undefined,
      twitterImage: input.twitterImage || undefined,
      updatedBy: decodedJwt?.userId || undefined,
      updatedAt: new Date(),
      createdAt: new Date(),
      createdBy: decodedJwt?.userId || undefined,
    },
    update: {
      linkedinPdfContent: input.linkedinPdfContent || undefined,
      linkedInImages: input.linkedInImages || undefined,
      linkedInPdf: input.linkedInPdf || undefined,
      twitterImage: input.twitterImage || undefined,
      updatedAt: new Date(),
      updatedBy: decodedJwt?.userId || undefined,
    },
    where: {
      byteId_spaceId: {
        byteId: input.byteId,
        spaceId: spaceId,
      },
    },
  });

  return savedObject;
}
