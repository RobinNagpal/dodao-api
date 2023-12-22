import { MutationUpdateThemeColorsArgs, Space } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateThemeColors(_: unknown, args: MutationUpdateThemeColorsArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);
  checkEditSpacePermission(spaceById, context);

  return prisma.space.update({
    data: {
      themeColors: {
        primaryColor: args.themeColors.primaryColor,
        bgColor: args.themeColors.bgColor,
        textColor: args.themeColors.textColor,
        linkColor: args.themeColors.linkColor,
        headingColor: args.themeColors.headingColor,
        borderColor: args.themeColors.borderColor,
        blockBg: args.themeColors.blockBg,
      },
    },
    where: {
      id: args.spaceId,
    },
  });
}
