import { getDecodedJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';

const superAdminsFromEnv = process.env.DODAO_SUPERADMINS ? process.env.DODAO_SUPERADMINS.split(',') : [];
const superAdminsArray = [...superAdminsFromEnv, '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', 'robinnagpal.tiet@gmail.com'].map((u) => u.toLowerCase().trim());
export function isDoDAOSuperAdmin(context: IncomingMessage): (JwtPayload & DoDaoJwtTokenPayload) | null {
  const decoded = getDecodedJwtFromContext(context);

  if (superAdminsArray.includes(decoded.username.toLowerCase())) {
    return decoded;
  }
  return null;
}

export function isSuperAdminOfDoDAO(username: string): boolean {
  return superAdminsArray.includes(username.toLowerCase());
}

export function validateSuperAdmin(context: IncomingMessage) {
  const decoded = getDecodedJwtFromContext(context);
  if (!isDoDAOSuperAdmin(context)) {
    throw new Error(`Not authorized ${decoded.username}`);
  }
}
