import { prisma } from '@/prisma';

import { Request, Response } from 'express-serve-static-core';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { v4 } from 'uuid';

const token = '';

async function smsWebhook(req: Request, res: Response) {
  prisma.twilioSms.create({
    data: {
      id: v4(),
      createdAt: new Date(),
      sid: req.body.SmsSid,
      updatedAt: new Date(),
      from: req.body.From,
      to: req.body.To,
      body: req.body.Body,
      direction: req.body.Direction,
    },
  });
  console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);

  const twiml = new MessagingResponse();

  res.type('text/xml').send(twiml.toString());
}

export default smsWebhook;
