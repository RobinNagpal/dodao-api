import { Request, Response } from 'express-serve-static-core';

export default function health(req: Request, res: Response) {
  return res.status(200).send('5');
}
