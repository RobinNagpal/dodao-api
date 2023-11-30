import { MutationDropPineconeNamespaceArgs } from '@/graphql/generated/graphql';
import { verifySpaceEditPermissions } from '@/helpers/permissions/verifySpaceEditPermissions';
import { validateSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { initPineconeClient } from '@/helpers/vectorIndexers/pineconeHelper';
import { IncomingMessage } from 'http';

export async function dropPineconeNamespace(_: unknown, args: MutationDropPineconeNamespaceArgs, context: IncomingMessage) {
  const { space } = await verifySpaceEditPermissions(context, args.spaceId);

  await validateSuperAdmin(context);
  const index = await initPineconeClient();
  await index._delete({
    deleteRequest: {
      deleteAll: true,
      namespace: space.id,
    },
  });

  return true;
}
