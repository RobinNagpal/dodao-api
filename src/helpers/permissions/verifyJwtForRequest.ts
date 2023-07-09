import { getSpaceById } from '@/graphql/operations/space';
import { getDecodedJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';

export interface SpaceAndDecodedJwt {
  space: Space;
  decodedJwt: JwtPayload & DoDaoJwtTokenPayload;
}

export async function verifyJwtForRequest(context: IncomingMessage, spaceId: string): Promise<SpaceAndDecodedJwt> {
  const spaceById = await getSpaceById(spaceId);

  const decodedJwt = getDecodedJwtFromContext(context);
  const user = decodedJwt?.accountId?.toLowerCase();
  if (!user) {
    throw Error('No accountId present in JWT');
  }

  return {
    space: spaceById,
    decodedJwt,
  };
}
