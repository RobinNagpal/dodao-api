import { IncomingHttpHeaders, IncomingMessage } from 'http';

export interface GraphqlContext extends IncomingMessage {
  ip: string;
  headers: IncomingHttpHeaders;
}
