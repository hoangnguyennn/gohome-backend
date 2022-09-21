import { NextFunction, Request, Response } from 'express';
import { HttpError, COMMON_MESSAGE, HTTP_STATUS } from './commonResponse';

export default (req: Request, res: Response, next: NextFunction) => {
  return next(new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND));
};
