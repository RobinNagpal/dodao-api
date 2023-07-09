import { DoDaoJwtTokenPayload } from '@/types/session';
import { IncomingMessage } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function getJwtFromContext(context: IncomingMessage) {
  return (context.headers?.[process.env.DODAO_AUTH_HEADER_NAME!] as string | undefined)?.replace('Bearer ', '');
}

export function getDecodedJwtFromContext(context: IncomingMessage): DoDaoJwtTokenPayload {
  const jwtString = getJwtFromContext(context);

  if (!jwtString) throw new Error('No JWT found in context');

  try {
    const decoded = jwt.verify(jwtString, process.env.DODAO_AUTH_SECRET!);
    return decoded as DoDaoJwtTokenPayload;
  } catch (err) {
    console.error('Failed to decode JWT:', err);
    throw err;
  }
}

export function getOptioanlJwt(context: IncomingMessage): (JwtPayload & DoDaoJwtTokenPayload) | undefined {
  const token = getJwtFromContext(context);
  if (!token) return undefined;
  return getDecodedJwtFromContext(context);
}
