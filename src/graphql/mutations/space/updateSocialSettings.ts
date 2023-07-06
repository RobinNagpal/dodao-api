import { MutationUpdateSocialSettingsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export async function updateSocialSettings(_: unknown, args: MutationUpdateSocialSettingsArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);

  checkEditSpacePermission(spaceById, context);

  return prisma.space.update({
    data: {
      socialSettings: {
        linkedSharePdfBackgroundImage: args.input.linkedSharePdfBackgroundImage,
      },
    },
    where: {
      id: args.spaceId,
    },
  });
}
