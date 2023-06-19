import { verifyJwt } from '@/helpers/login';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { IncomingMessage } from 'http';
import { JwtPayload } from 'jsonwebtoken';

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
  const decoded = verifyJwt(context);
  if (['0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', 'robinnagpal.tiet@gmail.com'].map((u) => u.toLowerCase()).includes(decoded.username.toLowerCase())) {
    return decoded;
  }
  return null;
}
