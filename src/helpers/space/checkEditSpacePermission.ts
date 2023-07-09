import { getDecodedJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { isDoDAOSuperAdmin, isSuperAdmin } from '@/helpers/space/isSuperAdmin';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';

function isDoDAOMember(context: IncomingMessage): (JwtPayload & DoDaoJwtTokenPayload) | null {
  const decoded = getDecodedJwtFromContext(context);
  if (
    ['0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', 'robinnagpal.tiet@gmail.com', 'jahnavimenon.m2020@vitstudent.ac.in', 'work.jahnavimenon@gmail.com']
      .map((u) => u.toLowerCase())
      .includes(decoded.username.toLowerCase())
  ) {
    return decoded;
  }
  return null;
}

export function canEditGitSpace(context: IncomingMessage, space: Space) {
  const doDAOMember = isDoDAOMember(context);

  if (doDAOMember && space.id === 'test-academy-eth') {
    return { decodedJWT: doDAOMember, canEditSpace: true, user: doDAOMember.accountId.toLowerCase() };
  }

  const doDAOAdmin = isDoDAOSuperAdmin(context);

  if (doDAOAdmin) {
    return { decodedJWT: doDAOAdmin, canEditSpace: true, user: doDAOAdmin.accountId.toLowerCase() };
  }

  const decodedJWT = getDecodedJwtFromContext(context);

  const user = decodedJWT.accountId.toLowerCase();

  const superAdmin = isSuperAdmin(user);

  if (!user) {
    throw Error('No accountId present in JWT');
  }
  const spaceAdmins = [space.creator.toLowerCase(), ...space.admins.map((admin) => admin.toLowerCase())];

  const isAdminOfSpace: boolean = spaceAdmins.includes(user.toLowerCase());

  const isAdminOfSpaceByUserName: boolean = space.adminUsernames.map((u) => u.toLowerCase()).includes(decodedJWT.username.toLowerCase());

  const canEditSpace = isAdminOfSpace || isAdminOfSpaceByUserName || superAdmin;
  return { decodedJWT, canEditSpace, user };
}

export function checkEditSpacePermission(space: Space, context: IncomingMessage): JwtPayload & DoDaoJwtTokenPayload {
  const { decodedJWT, canEditSpace } = canEditGitSpace(context, space);

  if (!canEditSpace) {
    throw new Error(
      'Not allowed to edit space :' +
        JSON.stringify({
          decodedJWT,
        }),
    );
  }

  return decodedJWT;
}
