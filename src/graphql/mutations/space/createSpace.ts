import { MutationCreateSpaceArgs } from '@/graphql/generated/graphql';
import { upsertSpaceIntegrations } from '@/graphql/mutations/space/upsertSpaceIntegrations';
import { getSpaceWithIntegrations } from '@/graphql/queries/space/getSpaceWithIntegrations';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';

export default async function createSpace(_: unknown, args: MutationCreateSpaceArgs, context: IncomingMessage) {
  const doDAOSuperAdmin = isDoDAOSuperAdmin(context);
  if (!doDAOSuperAdmin) {
    throw new Error('Space not found');
  }
  const input = args.spaceInput;

  const spaceInput: Space = {
    admins: input.admins,
    adminUsernames: input.adminUsernames,
    adminUsernamesV1: input.adminUsernamesV1,
    avatar: input.avatar,
    creator: doDAOSuperAdmin.accountId,
    features: input.features || [],
    id: input.id,
    type: input.type,
    inviteLinks: input.inviteLinks || {},
    name: input.name,
    skin: input.skin,
    settings: input || {},
    createdAt: new Date(),
    verified: true,
    updatedAt: new Date(),
    discordInvite: null,
    telegramInvite: null,
    domains: input.domains,
    botDomains: input.botDomains || [],
    guideSettings: {},
    authSettings: {},
    socialSettings: {},
    byteSettings: {},
    themeColors: null,
  };

  await prisma.space.create({
    data: {
      ...spaceInput,
      settings: spaceInput.settings || {},
      inviteLinks: spaceInput.inviteLinks || {},
      themeColors: undefined,
    },
  });

  await upsertSpaceIntegrations(input, doDAOSuperAdmin);

  return getSpaceWithIntegrations(spaceInput.id);
}
