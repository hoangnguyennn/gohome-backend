import { NextFunction, Response } from 'express';

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export enum COMMON_MESSAGE {
  BAD_REQUEST = 'bad request',
  FORBIDDEN = 'forbidden',
  INTERNAL_SERVER_ERROR = 'internal server error',
  INVALID_TOKEN = 'invalid token',
  NOT_FOUND = 'not found',
  SUCCESS = 'success',
  UNAUTHORIZED = 'unauthorized'
}

export class HttpError extends Error {
  statusCode: HTTP_STATUS;

  constructor(message: string, statusCode: HTTP_STATUS) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const success = <T>(res: Response, data?: T) => {
  return res.status(HTTP_STATUS.OK).json(data);
};

export const unauthorized = (
  next: NextFunction,
  message = COMMON_MESSAGE.UNAUTHORIZED
) => {
  return next(new HttpError(message, HTTP_STATUS.UNAUTHORIZED));
};

export const forbidden = (
  next: NextFunction,
  message = COMMON_MESSAGE.FORBIDDEN
) => {
  return next(new HttpError(message, HTTP_STATUS.UNAUTHORIZED));
};
