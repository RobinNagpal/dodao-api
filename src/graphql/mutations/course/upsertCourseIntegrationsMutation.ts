import { MutationUpsertCourseIntegrationsArgs, UpsertCourseIntegrationsInput } from '@/graphql/generated/graphql';
import { verifyCourseEditPermissions } from '@/helpers/permissions/verifyCourseEditPermissions';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';
import { uuid } from 'uuidv4';

async function transformInput(spaceId: string, message: UpsertCourseIntegrationsInput): Promise<UpsertCourseIntegrationsInput> {
  const integrations = await prisma.courseIntegration.findFirst({
    where: {
      spaceId,
      courseKey: message.courseKey,
    },
  });

  // we send masked webhook back so want to make sure we don't corrupt the stored data
  const discordWebhook = message.discordWebhook && !message.discordWebhook.includes('****') ? message.discordWebhook : integrations?.discordWebhook;

  return {
    courseKey: message.courseKey,
    discordRoleIds: message.discordRoleIds || [],
    discordRolePassingCount: message.discordRolePassingCount ? message.discordRolePassingCount : undefined,
    discordWebhook,
    projectGalaxyCredentialId: message.projectGalaxyCredentialId || undefined,
    projectGalaxyOatMintUrl: message.projectGalaxyOatMintUrl || undefined,
    projectGalaxyOatPassingCount: message.projectGalaxyOatPassingCount || undefined,
    projectGalaxyOatMintedContent: message.projectGalaxyOatMintedContent || undefined,
  };
}

export default async function upsertCourseIntegrationsMutation(_: unknown, args: MutationUpsertCourseIntegrationsArgs, context: IncomingMessage) {
  try {
    const { decodedJwt } = await verifyCourseEditPermissions(context, args.spaceId, args.courseIntegrationInput.courseKey);

    const transformedInput = await transformInput(args.spaceId, args.courseIntegrationInput);

    await prisma.courseIntegration.upsert({
      where: {
        spaceId_courseKey: {
          spaceId: args.spaceId,
          courseKey: args.courseIntegrationInput.courseKey,
        },
      },
      create: {
        id: uuid(),
        spaceId: args.spaceId,
        ...transformedInput,
        createdBy: decodedJwt.accountId,
      },
      update: {
        ...transformedInput,
      },
    });

    return await prisma.courseIntegration.findFirst({
      where: {
        spaceId: args.spaceId,
        courseKey: args.courseIntegrationInput.courseKey,
      },
    });
  } catch (e) {
    console.error((e as any)?.response?.data);
    throw e;
  }
}
