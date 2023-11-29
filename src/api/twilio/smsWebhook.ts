import { Request, Response } from 'express-serve-static-core';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { v4 } from 'uuid';

const token = '';

async function smsWebhook(req: Request, res: Response) {
  console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);

  const twiml = new MessagingResponse();

  res.type('text/xml').send(twiml.toString());
}

export default smsWebhook;
