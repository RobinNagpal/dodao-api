import { IncomingHttpHeaders } from 'http';

export interface Context {
  ip: string;
  headers: IncomingHttpHeaders;
}
