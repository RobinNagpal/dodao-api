import { getJwtFromContext } from '@/graphql/mutations/auth/getJwtFromContext';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';

export interface SpaceAndDecodedJwt {
  space: Space;
  decodedJwt: JwtPayload & DoDaoJwtTokenPayload;
}

export async function verifySpaceEditPermissions(context: IncomingMessage, spaceId: string): Promise<SpaceAndDecodedJwt> {
  const spaceById = await getSpaceById(spaceId);
  if (!spaceById) throw new Error(`No space found: ${spaceId}`);

  const decodedJwt = checkEditSpacePermission(spaceById, context);

  return {
    space: spaceById,
    decodedJwt,
  };
}
