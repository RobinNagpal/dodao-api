import { verifyJwt } from '@/helpers/login';
import { IncomingMessage } from 'http';

export function getDecodedJwtFromContext(context: IncomingMessage) {
  return verifyJwt(context);
}
