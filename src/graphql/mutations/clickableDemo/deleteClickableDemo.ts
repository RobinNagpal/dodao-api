import { MutationDeleteClickableDemoArgs, QueryClickableDemosArgs } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteClickableDemo(_: any, args: MutationDeleteClickableDemoArgs, context: IncomingMessage) {
  const spaceById = await getSpaceById(args.spaceId);
  checkEditSpacePermission(spaceById, context);
  const updatedClickableDemo = await prisma.clickableDemos.update({
    where: {
      id: args.demoId,
    },
    data: {
      archive: true,
    },
  });
  return updatedClickableDemo;
}
