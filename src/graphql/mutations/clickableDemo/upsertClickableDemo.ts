import { MutationUpsertClickableDemoArgs, ClickableDemoWithSteps } from '@/graphql/generated/graphql';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission, checkSpaceIdAndSpaceInEntityAreSame } from '@/helpers/space/checkEditSpacePermission';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function upsertClickableDemo(_: any, args: MutationUpsertClickableDemoArgs, context: IncomingMessage): Promise<ClickableDemoWithSteps> {
  const spaceById = await getSpaceById(args.spaceId);

  checkSpaceIdAndSpaceInEntityAreSame(args.spaceId, args.spaceId);
  checkEditSpacePermission(spaceById, context);

  const clickableDemo = await prisma.clickableDemos.upsert({
    where: {
      id: args.input.id,
    },
    create: {
      id: args.input.id,
      title: args.input.title,
      excerpt: args.input.excerpt,
      spaceId: args.spaceId,
      createdAt: new Date(),
      updatedAt: new Date(),
      steps: args.input.steps,
    },
    update: {
      title: args.input.title,
      excerpt: args.input.excerpt,
      updatedAt: new Date(),
      steps: args.input.steps,
    },
  });

  return clickableDemo;
}
