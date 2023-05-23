import submitByteMutation from '@/graphql/mutations/byte/submitByteMutation';

export default {
  submitByte: (_: unknown, args: any, context: any) => submitByteMutation(_, args, context),
};
