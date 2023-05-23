import { getJwtFromContext } from '@/graphql/mutations/auth/getJwtFromContext';
import { getSpaceById } from '@/graphql/operations/space';
import { checkEditCoursePermission } from '@/helpers/space/checkEditCoursePermission';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';

export interface SpaceAndDecodedJwt {
  space: Space;
  decodedJwt: JwtPayload & DoDaoJwtTokenPayload;
}

export async function verifyCourseEditPermissions(context: IncomingMessage, spaceId: string, courseKey: string): Promise<SpaceAndDecodedJwt> {
  const spaceById = await getSpaceById(spaceId);
  if (!spaceById) throw new Error(`No space found: ${spaceId}`);

  const jwt = getJwtFromContext(context);
  const decodedJwt = await checkEditCoursePermission(spaceById, jwt, courseKey);

  return {
    space: spaceById,
    decodedJwt,
  };
}
