import { verifyJwt } from '@/helpers/login';
import { getJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { isDoDAOSuperAdmin, isSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';

function isDoDAOMember(context: IncomingMessage): (JwtPayload & DoDaoJwtTokenPayload) | null {
  const decoded = verifyJwt(context);
  if (
    ['0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', 'robinnagpal.tiet@gmail.com', '0x577a6E294505A797976f218eFd751aB5557E1522']
      .map((u) => u.toLowerCase())
      .includes(decoded.username.toLowerCase())
  ) {
    return decoded;
  }
  return null;
}

export function canEditGitSpace(context: IncomingMessage, space: Space) {
  const doDAOMember = isDoDAOMember(context);
  const doDAOAdmin = isDoDAOSuperAdmin(context);

  if (doDAOAdmin) {
    return { decodedJWT: doDAOAdmin, canEditSpace: true, user: doDAOAdmin.accountId.toLowerCase() };
  }

  if (doDAOMember && space.id === 'test-academy-eth') {
    return { decodedJWT: doDAOMember, canEditSpace: true, user: doDAOMember.accountId.toLowerCase() };
  }
  const decodedJWT = verifyJwt(context);

  const user = decodedJWT.accountId.toLowerCase();

  const superAdmin = isSuperAdmin(user);

  if (!user) {
    throw Error('No accountId present in JWT');
  }
  const spaceAdmins = [space.creator.toLowerCase(), ...space.admins.map((admin) => admin.toLowerCase())];

  const isAdminOfSpace: boolean = spaceAdmins.includes(user.toLowerCase());

  const canEditSpace = isAdminOfSpace || superAdmin;
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
