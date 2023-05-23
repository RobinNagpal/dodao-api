import { DoDaoJwtTokenPayload } from '@/types/session';
import { IncomingMessage } from 'http';
import jwt from 'jsonwebtoken';

export function getJwtFromContext(context: IncomingMessage) {
  console.log('getJwtFromContext', context);
  return (context.headers?.[process.env.DODAO_AUTH_HEADER_NAME!] as string | undefined)?.replace('Bearer ', '') || '';
}

export function getDecodedJwtFromContext(context: IncomingMessage): DoDaoJwtTokenPayload {
  const jwtString = getJwtFromContext(context);
  try {
    const decoded = jwt.verify(jwtString, process.env.DODAO_AUTH_SECRET!);
    return decoded as DoDaoJwtTokenPayload;
  } catch (err) {
    console.error('Failed to decode JWT:', err);
    throw err;
  }
}
