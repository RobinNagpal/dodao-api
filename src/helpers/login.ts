import { JwtModel } from '@/deprecatedSchemas/models/JwtModel';
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
    }
  );
}

export function verifyJwt(token: string): JwtPayload & JwtModel {
  return jwt.verify(token, process.env.JWT_PRIVATE_KEY!) as JwtPayload & JwtModel;
}