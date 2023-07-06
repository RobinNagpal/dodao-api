import { getJwtFromContext } from '@/helpers/permissions/getJwtFromContext';
import { DoDaoJwtTokenPayload } from '@/types/session';
import { IncomingMessage } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function createJwt(accountId: string, blockchain: string, connector: string): string {
  return jwt.sign(
    {
      accountId: accountId,
      blockchain: blockchain,
      createdAt: new Date().toISOString(),
      connector,
    },
    process.env.JWT_PRIVATE_KEY!,
    {
      expiresIn: 30 * 24 * 60 * 60, // 30 days
    },
  );
}

export function verifyJwt(context: IncomingMessage): JwtPayload & DoDaoJwtTokenPayload {
  const token = getJwtFromContext(context);
  return jwt.verify(token, process.env.DODAO_AUTH_SECRET!) as JwtPayload & DoDaoJwtTokenPayload;
}
