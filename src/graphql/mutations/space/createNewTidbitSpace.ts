import { MutationCreateSpaceArgs } from '@/graphql/generated/graphql';
import upsertRoute53Record from '@/graphql/mutations/space/upsertRoute53Record';
import { upsertSpaceIntegrations } from '@/graphql/mutations/space/upsertSpaceIntegrations';
import upsertVercelDomainRecord from '@/graphql/mutations/space/upsertVercelDomainRecord';
import { getSpaceWithIntegrations } from '@/graphql/queries/space/getSpaceWithIntegrations';
import { getDecodedJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { isDoDAOSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export default async function createNewTidbitSpace(_: unknown, args: MutationCreateSpaceArgs, context: IncomingMessage) {
  const decoded = getDecodedJwtFromContext(context);
  const username = decoded.username;
  if (!username) {
    throw new Error('Not authorized');
  }

  const existingSpaceForCreator = await prisma.space.findFirst({
    where: {
      creator: username,
    },
  });

  if (existingSpaceForCreator) {
    throw new Error('Space already for this user');
  }

  const existingSpaceForId = await prisma.space.findFirst({
    where: {
      id: args.spaceInput.id,
    },
  });

  if (existingSpaceForId) {
    throw new Error('Space already exists with this id');
  }

  const input = args.spaceInput;

  const spaceInput: Space = {
    admins: input.admins,
    adminUsernames: input.adminUsernames,
    adminUsernamesV1: [
      {
        nameOfTheUser: username,
        username: username,
      },
    ],
    avatar: input.avatar,
    creator: input.creator,
    features: input.features || [],
    id: input.id,
    type: input.type,
    inviteLinks: {},
    name: input.name,
    skin: input.skin,
    settings: input || {},
    createdAt: new Date(),
    verified: true,
    updatedAt: new Date(),
    discordInvite: null,
    telegramInvite: null,
    domains: [`${input.id}.tidbitshub.org`],
    botDomains: [],
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

  await prisma.spaceIntegration.create({
    data: {
      id: v4(),
      spaceId: spaceInput.id,

      updatedAt: new Date(),
      updatedBy: username,
    },
  });

  await upsertRoute53Record(_, { spaceId: spaceInput.id }, context);
  await upsertVercelDomainRecord(_, { spaceId: spaceInput.id }, context);
  return getSpaceWithIntegrations(spaceInput.id);
}
