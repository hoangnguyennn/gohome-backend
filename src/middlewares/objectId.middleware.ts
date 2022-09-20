import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';

export const checkValidObjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  next();
};
