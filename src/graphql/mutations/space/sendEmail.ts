import { MutationSendEmailArgs } from '@/graphql/generated/graphql';
import { google } from 'googleapis';
import { IncomingMessage } from 'http';
import { Base64 } from 'js-base64';

export default async function sendEmail(_: unknown, args: MutationSendEmailArgs, context: IncomingMessage) {
  const { firstName, lastName, email, message } = args.input;
  // Environment variables
  const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/\\/g, '');

  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    undefined,
    GOOGLE_PRIVATE_KEY,
    ['https://www.googleapis.com/auth/gmail.send'],
    'robinnagpal@dodao.io',
  );

  const credentials = await jwtClient.authorize();

  console.log('Google auth success', credentials);

  const gmail = google.gmail({ version: 'v1', auth: jwtClient });

  const rawToEnquiry = makeBody('robinnagpal@dodao.io', 'robinnagpal@dodao.io', `New message from ${firstName} ${lastName} - ${email}`, message);
  const rawToUser = makeBody(
    email,
    'robinnagpal@dodao.io',
    `Confirmation of your message to DoDAO`,
    'Thank you for your message. We will contact you back soon.',
  );
  const resultFromEnquiry = await gmail.users.messages.send({
    userId: 'robinnagpal@dodao.io',
    requestBody: {
      raw: rawToEnquiry,
    },
  });
  const resultFromUser = await gmail.users.messages.send({
    userId: 'robinnagpal@dodao.io',
    requestBody: {
      raw: rawToUser,
    },
  });

  console.log(resultFromEnquiry);
  console.log(resultFromUser);

  return true;
}

function makeBody(to: string, from: string, subject: string, message: string) {
  const str = [
    `Content-Type: text/plain; charset="UTF-8"\n`,
    `MIME-Version: 1.0\n`,
    `Content-Transfer-Encoding: 7bit\n`,
    `to: ${to}\n`,
    `from: ${from}\n`,
    `subject: ${subject}\n\n`,
    message,
  ].join('');

  return Base64.encodeURI(str).replace(/\+/g, '-').replace(/\//g, '_');
}
