import { MutationUpdateTidbitsHomepageArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function updateTidbitsHomepage(_: unknown, args: MutationUpdateTidbitsHomepageArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);
  checkEditSpacePermission(spaceById, context);

  return await prisma.space.update({
    data: {
      tidbitsHomepage: {
        heading: args.tidbitsHomepage.heading,
        shortDescription: args.tidbitsHomepage.shortDescription,
      },
    },
    where: {
      id: args.spaceId,
    },
  });
}
