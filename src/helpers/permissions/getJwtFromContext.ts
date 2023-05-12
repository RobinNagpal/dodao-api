import { verifyJwt } from '@/helpers/login';
import { IncomingMessage } from 'http';

export function getJwtFromContext(context: IncomingMessage) {
  return context.headers?.authorization?.replace('Bearer ', '') || '';
}

export function getDecodedJwtFromContext(context: IncomingMessage) {
  const jwtString = getJwtFromContext(context);
  return verifyJwt(jwtString);
}
