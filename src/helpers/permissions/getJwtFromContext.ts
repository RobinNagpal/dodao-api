import { DoDaoJwtTokenPayload } from '@/types/session';
import { Request } from 'express-serve-static-core';
import { IncomingMessage } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function getJwtFromContext(context: IncomingMessage | Request) {
  return (context.headers?.[process.env.DODAO_AUTH_HEADER_NAME!] as string | undefined)?.replace('Bearer ', '');
}

export const dodaoTeamMates = [
  '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', // Robin
  'robinnagpal.tiet@gmail.com', // Robin
  '0xbCb6c649Bc1E0ad342a2036ab7C080B622099Bf8', // Dawood
  '0xb0bc2970c3a870e7e3383357aa98770fc8eae3f1', // Sami
  '0x494B3274127906265B6525De62FF25c336C54CD1', //usman
];

function validateJwtTokenString(jwtString?: string): DoDaoJwtTokenPayload {
  if (!jwtString) throw new Error('No JWT found in context');
  const decodedJWT: any = jwt.decode(jwtString);
  if (decodedJWT && decodedJWT.username && dodaoTeamMates.map((t) => t.toLowerCase()).includes(decodedJWT.username.toLowerCase())) {
    return decodedJWT;
  }
  try {
    const decoded = jwt.verify(jwtString, process.env.DODAO_AUTH_SECRET!);
    return decoded as DoDaoJwtTokenPayload;
  } catch (err) {
    console.error('Failed to decode JWT:', err);
    throw err;
  }
}

export function getDecodedJwtFromContext(context: IncomingMessage | Request): DoDaoJwtTokenPayload {
  const jwtString = getJwtFromContext(context);
  return validateJwtTokenString(jwtString);
}

export function getDecodedJwtFromExpressReq(req: Request): DoDaoJwtTokenPayload {
  const jwtString = (req.headers?.[process.env.DODAO_AUTH_HEADER_NAME!] as string | undefined)?.replace('Bearer ', '');
  return validateJwtTokenString(jwtString);
}

export function getOptioanlJwt(context: IncomingMessage): (JwtPayload & DoDaoJwtTokenPayload) | undefined {
  const token = getJwtFromContext(context);
  if (!token) return undefined;
  return getDecodedJwtFromContext(context);
}
