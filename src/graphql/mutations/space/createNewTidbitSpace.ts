import { MutationCreateSpaceArgs } from '@/graphql/generated/graphql';
import { upsertSpaceIntegrations } from '@/graphql/mutations/space/upsertSpaceIntegrations';
import { getSpaceWithIntegrations } from '@/graphql/queries/space/getSpaceWithIntegrations';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export default async function createNewTidbitSpace(_: unknown, args: MutationCreateSpaceArgs, context: IncomingMessage) {
  const input = args.spaceInput;

  const spaceInput: Space = {
    admins: input.admins,
    adminUsernames: input.adminUsernames,
    adminUsernamesV1: input.adminUsernamesV1,
    avatar: input.avatar,
    creator: input.creator,
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

  await prisma.spaceIntegration.upsert({
    create: {
      id: v4(),
      spaceId: spaceInput.id,
      academyRepository: spaceInput.spaceIntegrations.academyRepository,
      discordGuildId: spaceInput.spaceIntegrations.discordGuildId,
      gitGuideRepositories: spaceInput.spaceIntegrations.gitGuideRepositories,
      gnosisSafeWallets: spaceInput.spaceIntegrations.gnosisSafeWallets,

      projectGalaxyTokenLastFour: spaceInput.spaceIntegrations.projectGalaxyTokenLastFour,
      updatedAt: new Date(),
      updatedBy: user.accountId,
    },
    update: {
      spaceId: spaceInput.id,
      academyRepository: spaceInput.spaceIntegrations.academyRepository,
      discordGuildId: spaceInput.spaceIntegrations.discordGuildId,
      gitGuideRepositories: spaceInput.spaceIntegrations.gitGuideRepositories,
      gnosisSafeWallets: spaceInput.spaceIntegrations.gnosisSafeWallets,
      projectGalaxyTokenLastFour: spaceInput.spaceIntegrations.projectGalaxyTokenLastFour,
      updatedBy: user.accountId,
    },
    where: {
      spaceId: spaceInput.id,
    },
  });
  await upsertSpaceIntegrations(input, doDAOSuperAdmin);

  return getSpaceWithIntegrations(spaceInput.id);
}
