import saveByteMutation from '@/graphql/mutations/byte/saveByteMutation';

export default {
  saveByte: (_: unknown, args: any, context: any) => saveByteMutation(_, args, context),
};
