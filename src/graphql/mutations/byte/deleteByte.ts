import { MutationDeleteByteArgs } from '@/graphql/generated/graphql';
import { validateSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { prisma } from '@/prisma';
import { IncomingMessage } from 'http';

export default async function deleteByte(_: unknown, args: MutationDeleteByteArgs, context: IncomingMessage): Promise<boolean> {
  validateSuperAdmin(context);

  const deleted = await prisma.byte.delete({
    where: {
      id: args.byteId,
    },
  });

  return !!deleted;
}
