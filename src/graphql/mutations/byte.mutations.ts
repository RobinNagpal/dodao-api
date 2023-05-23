import upsertByteMutation from '@/graphql/mutations/byte/upsertByteMutation';

export default {
  upsertByte: (_: unknown, args: any, context: any) => upsertByteMutation(_, args, context),
};
