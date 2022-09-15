import { NextFunction, Request, Response } from 'express';

const isDev = process.env.NODE !== 'production';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({
    message: err.message,
    stack: isDev ? err.stack : undefined
  });
};
