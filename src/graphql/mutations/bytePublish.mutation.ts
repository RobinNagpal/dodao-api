import publishByteMutation from '@/graphql/mutations/byte/publishByteMutation';

export default {
  publishByte: (_: unknown, args: any, context: any) => publishByteMutation(_, args, context),
};
