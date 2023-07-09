import { MutationUpdateByteSettingsArgs, MutationUpdateSocialSettingsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export async function updateByteSettings(_: unknown, args: MutationUpdateByteSettingsArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);

  checkEditSpacePermission(spaceById, context);

  return prisma.space.update({
    data: {
      byteSettings: {
        askForLoginToSubmit: args.input.askForLoginToSubmit,
        captureBeforeAndAfterRating: args.input.captureBeforeAndAfterRating,
        showCategoriesInSidebar: args.input.showCategoriesInSidebar,
      },
    },
    where: {
      id: args.spaceId,
    },
  });
}
