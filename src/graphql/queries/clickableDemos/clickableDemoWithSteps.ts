import { QueryClickableDemoWithStepsArgs, ClickableDemoWithSteps } from '@/graphql/generated/graphql';
import { prisma } from '@/prisma';

export async function getClickableDemoWithSteps(spaceId: string, demoId: string): Promise<ClickableDemoWithSteps> {
  const clickableDemoWithSteps = await prisma.clickableDemos.findUniqueOrThrow({
    where: {
      id: demoId,
    },
  });

  return clickableDemoWithSteps;
}
export default async function clickableDemoWithSteps(_: any, args: QueryClickableDemoWithStepsArgs) {
  return getClickableDemoWithSteps(args.spaceId, args.demoId);
}
