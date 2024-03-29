import { MutationUpdateSpaceArgs } from '@/graphql/generated/graphql';
import { upsertSpaceIntegrations } from '@/graphql/mutations/space/upsertSpaceIntegrations';
import { getSpaceWithIntegrations } from '@/graphql/queries/space/getSpaceWithIntegrations';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';

export default async function updateSpace(_: unknown, args: MutationUpdateSpaceArgs, context: IncomingMessage) {
  const { decodedJwt, space } = await verifySpaceEditPermissions(context, args.spaceInput.id);

  const doDAOSuperAdmin = isDoDAOSuperAdmin(context);

  const user: DoDaoJwtTokenPayload = decodedJwt;

  const spaceInput: Space = {
    admins: args.spaceInput.admins,
    adminUsernames: args.spaceInput.adminUsernames,
    adminUsernamesV1: args.spaceInput.adminUsernamesV1,
    avatar: args.spaceInput.avatar,
    creator: args.spaceInput.creator,
    features: args.spaceInput.features || [],
    id: args.spaceInput.id,
    inviteLinks: args.spaceInput.inviteLinks || {},
    name: args.spaceInput.name,
    skin: args.spaceInput.skin,
    createdAt: new Date(),
    verified: true,
    updatedAt: new Date(),
    discordInvite: null,
    telegramInvite: null,
    domains: doDAOSuperAdmin ? args.spaceInput.domains : space.domains,
    botDomains: doDAOSuperAdmin ? args.spaceInput.botDomains || [] : space.botDomains || [],
    authSettings: space.authSettings || {},
    guideSettings: space.guideSettings || {},
    socialSettings: space.socialSettings || {},
    byteSettings: space.byteSettings || {},
    themeColors: space.themeColors || null,
    tidbitsHomepage: space.tidbitsHomepage || null,
    type: args.spaceInput.type || space.type,
  };
  try {
    console.log('Updating space', spaceInput);
    await prisma.space.update({
      data: {
        ...spaceInput,
        telegramInvite: null,
        discordInvite: null,
        inviteLinks: spaceInput.inviteLinks || {
          discordInviteLink: null,
          telegramInviteLink: null,
        },
        guideSettings: spaceInput.guideSettings || {},
        authSettings: spaceInput.authSettings || {},
        byteSettings: spaceInput.byteSettings || {},
        themeColors: spaceInput.themeColors || undefined,
        tidbitsHomepage: spaceInput.tidbitsHomepage || undefined,
        type: spaceInput.type,
      },
      where: {
        id: args.spaceInput.id,
      },
    });

    await upsertSpaceIntegrations(args.spaceInput, user);
  } catch (e) {
    console.error(e);
    throw e;
  }
  return getSpaceWithIntegrations(spaceInput.id);
}
