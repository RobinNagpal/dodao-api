import { verifyJwt } from '@/helpers/login';
import { isSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';

export function canEditGitSpace(context: IncomingMessage, space: Space) {
  const decodedJWT = verifyJwt(context);
  const user = decodedJWT.accountId.toLowerCase();
  if (!user) {
    throw Error('No accountId present in JWT');
  }
  const spaceAdmins = [space.creator.toLowerCase(), ...space.admins.map((admin) => admin.toLowerCase())];

  const isAdminOfSpace: boolean = spaceAdmins.includes(user.toLowerCase());

  const isDoDAOAdmin = isSuperAdmin(user);
  const canEditSpace = isAdminOfSpace || isDoDAOAdmin;
  return { decodedJWT, canEditSpace, user };
}

export function checkEditSpacePermission(space: Space, context: IncomingMessage): JwtPayload & DoDaoJwtTokenPayload {
  const { decodedJWT, canEditSpace } = canEditGitSpace(context, space);

  if (!canEditSpace) {
    throw new Error(
      'Not allowed to edit space :' +
        JSON.stringify({
          decodedJWT,
        })
    );
  }

  return decodedJWT;
}
