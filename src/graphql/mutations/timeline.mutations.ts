import upsertTimelineMutation from '@/graphql/mutations/timeline/upsertTimelineMutation';

export default {
  upsertTimeline: (_: unknown, args: any, context: any) => upsertTimelineMutation(_, args, context),
};
