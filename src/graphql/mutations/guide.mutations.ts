import refreshGitGuides from '@/graphql/mutations/guide/refreshGitGuides';

export default {
  refreshGitGuides: (_: unknown, args: any, context: any) => refreshGitGuides(_, args, context),
};
