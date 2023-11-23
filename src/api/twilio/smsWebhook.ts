import apiResponseWrapper from '@/helpers/api/apiResponseWrapper';

import { Request, Response } from 'express-serve-static-core';
import { twiml } from 'twilio';

const token = '';

async function smsWebhook(req: Request, res: Response) {
  const messagingResponse = new twiml.MessagingResponse();

  console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);

  messagingResponse.message('The Robots are coming! Head for the hills!');

  return { status: 200, body: messagingResponse.toString() };
}

export default apiResponseWrapper(smsWebhook);
