import { getDecodedJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';
const superAdmins = process.env.DODAO_SUPERADMINS;
const superAdminsArray = superAdmins?.split(',') ?? [];

export function isSuperAdmin(user: string) {
  const isWhiteListedAdmin = !!process.env.DODAO_WHITELISTED_ADMINS?.split(',')
    .map((admin) => admin.toLowerCase())
    .includes(user);

  const isBlacklistedAdmin = process.env.DODAO_BLACKLISTED_ADMINS?.split(',')
    .map((admin) => admin.toLowerCase())
    .includes(user);

  return isWhiteListedAdmin && !isBlacklistedAdmin;
}

export function isDoDAOSuperAdmin(context: IncomingMessage): (JwtPayload & DoDaoJwtTokenPayload) | null {
  const decoded = getDecodedJwtFromContext(context);
  if ([superAdminsArray[0], superAdminsArray[1]].map((u) => u.toLowerCase()).includes(decoded.username.toLowerCase())) {
    return decoded;
  }
  return null;
}

export function validateSuperAdmin(context: IncomingMessage) {
  const decoded = getDecodedJwtFromContext(context);
  if (!isSuperAdmin(decoded.username.toLowerCase())) {
    throw new Error(`Not authorized ${decoded.username}`);
  }
}
