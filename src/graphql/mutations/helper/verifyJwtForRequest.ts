import { verifyJwt } from '@/helpers/login';
import { getJwtFromContext } from '@/graphql/mutations/auth/getJwtFromContext';
import { getSpaceById } from '@/graphql/operations/space';
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
  if (!spaceById) throw new Error(`No space found: ${spaceId}`);

  const jwt = getJwtFromContext(context);
  const decodedJwt = verifyJwt(jwt);
  const user = decodedJwt?.accountId?.toLowerCase();
  if (!user) {
    throw Error('No accountId present in JWT');
  }

  return {
    space: spaceById,
    decodedJwt,
  };
}
