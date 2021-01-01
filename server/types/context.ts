import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';

export interface ExpressSession extends Session {
  userId?: number;
}

export interface MyContext {
  redis: Redis;
  req: Request;
  res: Response;
  session: ExpressSession;
  url: string;
}
