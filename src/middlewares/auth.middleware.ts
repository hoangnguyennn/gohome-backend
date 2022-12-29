import { NextFunction, Request, Response } from 'express'
import {
  COMMON_MESSAGE,
  forbidden,
  unauthorized
} from '~/helpers/commonResponse'
import tokenUtil from '~/utils/token.util'

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization

  if (!bearerToken) {
    return unauthorized(next)
  }

  const token = String(bearerToken).split('Bearer ')[1]

  if (!token) {
    return unauthorized(next)
  }

  const decoded = tokenUtil.decodeToken(token)

  if (!decoded) {
    return forbidden(next, COMMON_MESSAGE.INVALID_TOKEN)
  }

  req.user = decoded
  return next()
}
