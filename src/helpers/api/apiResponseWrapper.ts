import { logError } from '@/helpers/errorLogger';
import { Request, Response } from 'express-serve-static-core';
import TwilioSDK from 'twilio';
import MessagingResponse = TwilioSDK.twiml.MessagingResponse;

export default function apiResponseWrapper(fn: (req: Request, res: Response) => Promise<{ status: number; body: any }>) {
  return async (req: Request, res: Response) => {
    try {
      const result = await fn(req, res);
      return res.status(result.status).send(result.body);
    } catch (e: any) {
      console.error(e);
      logError(e?.message, { error: e } as any);
      return res.status(500).send(e?.message);
    }
  };
}
