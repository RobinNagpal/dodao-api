import addDiscordCredentials from '@/graphql/mutations/space/addDiscordCredentials';
import createSignedUrlMutation from '@/graphql/mutations/space/createSignedUrlMutation';
import upsertGnosisSafeWallets from '@/graphql/mutations/space/upsertGnosisSafeWallets';
import upsertProjectGalaxyAccessToken from '@/graphql/mutations/space/upsertProjectGalaxyAccessToken';
import upsertSpaceAcademyRepositoryMutation from '@/graphql/mutations/space/upsertSpaceAcademyRepositoryMutation';
import upsertSpaceFeaturesMutation from '@/graphql/mutations/space/upsertSpaceFeaturesMutation';
import upsertSpaceInviteLinksMutation from '@/graphql/mutations/space/upsertSpaceInviteLinksMutation';
import reloadAcademyRepository from '@/graphql/mutations/space/reloadAcademyRepository';

export default {
  addDiscordCredentials: (_: unknown, args: any, context: any) => addDiscordCredentials(_, args, context),

  upsertGnosisSafeWallets: (_: unknown, args: any, context: any) => upsertGnosisSafeWallets(_, args, context),

  upsertSpaceInviteLinks: (_: unknown, args: any, context: any) => upsertSpaceInviteLinksMutation(_, args, context),

  upsertProjectGalaxyAccessToken: (_: unknown, args: any, context: any) => upsertProjectGalaxyAccessToken(_, args, context),

  upsertSpaceFeatures: (_: unknown, args: any, context: any) => upsertSpaceFeaturesMutation(_, args, context),

  upsertSpaceAcademyRepository: (_: unknown, args: any, context: any) => upsertSpaceAcademyRepositoryMutation(_, args, context),

  createSignedUrl: (_: unknown, args: any, context: any) => createSignedUrlMutation(_, args, context),

  reloadAcademyRepository,
};
