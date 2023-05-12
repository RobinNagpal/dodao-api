import { JwtModel } from '@/deprecatedSchemas/models/JwtModel';
import { getJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { prisma } from '@/prisma';
import { Space } from '@prisma/client';
import { checkEditCoursePermission } from '@/helpers/space/checkEditCoursePermission';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';

export interface SpaceAndDecodedJwt {
  space: Space;
  decodedJwt: JwtPayload & JwtModel;
}

export async function verifyCourseEditPermissions(context: IncomingMessage, spaceId: string, courseKey: string): Promise<SpaceAndDecodedJwt> {
  const spaceById = await prisma.space.findFirstOrThrow({ where: { id: spaceId } });
  const jwt = getJwtFromContext(context);
  const decodedJwt = await checkEditCoursePermission(spaceById, jwt, courseKey);

  return {
    space: spaceById,
    decodedJwt,
  };
}
