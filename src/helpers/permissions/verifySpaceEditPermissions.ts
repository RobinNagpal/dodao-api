import { JwtModel } from '@/deprecatedSchemas/models/JwtModel';
import { SpaceModel } from '@/deprecatedSchemas/models/SpaceModel';
import { getJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { prisma } from '@/prisma';
import { checkEditSpacePermission } from '@/helpers/space/checkEditSpacePermission';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';

export interface SpaceAndDecodedJwt {
  space: Space;
  decodedJwt: JwtPayload & JwtModel;
}

export async function verifySpaceEditPermissions(context: IncomingMessage, spaceId: string): Promise<SpaceAndDecodedJwt> {
  const spaceById = await prisma.space.findFirstOrThrow({ where: { id: spaceId } });
  const jwt = getJwtFromContext(context);
  const decodedJwt = checkEditSpacePermission(spaceById, jwt);

  return {
    space: spaceById,
    decodedJwt,
  };
}
