import { JwtModel } from '@/deprecatedSchemas/models/JwtModel';
import { verifyJwt } from '@/helpers/login';
import { getJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';

export interface SpaceAndDecodedJwt {
  space: Space;
  decodedJwt: JwtPayload & JwtModel;
}

export async function verifyJwtForRequest(context: IncomingMessage, spaceId: string): Promise<SpaceAndDecodedJwt> {
  const spaceById = await prisma.space.findFirstOrThrow({ where: { id: spaceId } });

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
