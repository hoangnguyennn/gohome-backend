/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS } from '~/helpers/commonResponse'

const isDev = process.env.NODE !== 'production'

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    code: err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message,
    stack: isDev ? err.stack : undefined
  })
}
