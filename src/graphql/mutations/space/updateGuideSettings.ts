import { MutationUpdateGuideSettingsArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export async function updateGuideSettings(_: unknown, args: MutationUpdateGuideSettingsArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);

  checkEditSpacePermission(spaceById, context);

  await prisma.space.update({
    data: {
      guideSettings: {
        askForLoginToSubmit: args.input.askForLoginToSubmit,
        captureBeforeAndAfterRating: args.input.captureBeforeAndAfterRating,
        showCategoriesInSidebar: args.input.showCategoriesInSidebar,
        showIncorrectAfterEachStep: args.input.showIncorrectAfterEachStep,
        showIncorrectOnCompletion: args.input.showIncorrectOnCompletion,
      },
    },
    where: {
      id: args.spaceId,
    },
  });
}
