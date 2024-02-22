import { getDecodedJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { isDoDAOSuperAdmin, isSuperAdminOfDoDAO } from '@/helpers/space/isSuperAdmin';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { Space } from '@prisma/client';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';

function isDoDAOMember(context: IncomingMessage): (JwtPayload & DoDaoJwtTokenPayload) | null {
  const decoded = getDecodedJwtFromContext(context);
  if (
    [
      '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', // Robin
      'robinnagpal.tiet@gmail.com', // Robin
      '0xbCb6c649Bc1E0ad342a2036ab7C080B622099Bf8', // Dawood
    ]
      .map((u) => u.toLowerCase())
      .includes(decoded.username.toLowerCase())
  ) {
    return decoded;
  }
  return null;
}

export function isUserAdminOfSpace(decodedJWT: DoDaoJwtTokenPayload, space: Space) {
  const user = decodedJWT.accountId.toLowerCase();

  if (!user) {
    throw Error('No accountId present in JWT');
  }
  const spaceAdmins = [space.creator.toLowerCase(), ...space.admins.map((admin) => admin.toLowerCase())];

  const isAdminOfSpace: boolean = spaceAdmins.includes(user.toLowerCase());

  const isAdminOfSpaceByUserName: boolean = space.adminUsernames.map((u) => u.toLowerCase()).includes(decodedJWT.username.toLowerCase());
  const isAdminOfSpaceByUserNameByName: boolean = space.adminUsernamesV1.map((u) => u.username.toLowerCase()).includes(decodedJWT.username.toLowerCase());

  const canEditSpace = isAdminOfSpace || isAdminOfSpaceByUserName || isSuperAdminOfDoDAO(user) || isAdminOfSpaceByUserNameByName;
  return { decodedJWT, canEditSpace, user };
}

export function canEditGitSpace(context: IncomingMessage, space: Space) {
  const doDAOMember = isDoDAOMember(context);

  if (doDAOMember && space.id === 'test-academy-eth') {
    return { decodedJWT: doDAOMember, canEditSpace: true, user: doDAOMember.accountId.toLowerCase() };
  }

  const isCreator =
    space.creator.toLowerCase() === getDecodedJwtFromContext(context).username.toLowerCase() ||
    space.creator.toLowerCase() === getDecodedJwtFromContext(context).accountId.toLowerCase();

  if (isCreator) {
    return { decodedJWT: getDecodedJwtFromContext(context), canEditSpace: true, user: getDecodedJwtFromContext(context).accountId.toLowerCase() };
  }

  const doDAOAdmin = isDoDAOSuperAdmin(context);

  if (doDAOAdmin) {
    return { decodedJWT: doDAOAdmin, canEditSpace: true, user: doDAOAdmin.accountId.toLowerCase() };
  }

  const decodedJWT = getDecodedJwtFromContext(context);

  return isUserAdminOfSpace(decodedJWT, space);
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

export function checkIsCreator(space: Space, context: IncomingMessage): JwtPayload & DoDaoJwtTokenPayload {
  const { decodedJWT, canEditSpace } = canEditGitSpace(context, space);

  if (space.creator.toLowerCase() !== decodedJWT.accountId.toLowerCase()) {
    throw new Error(
      'Not allowed to edit space :' +
        JSON.stringify({
          decodedJWT,
        }),
    );
  }

  return decodedJWT;
}
