import jwt from 'jsonwebtoken'

import env from '~/configs/env'
import { ITokenPayload } from '~/interfaces'

const generateToken = (payload: ITokenPayload) => {
  return jwt.sign(payload, env.tokenSecret, { expiresIn: env.tokenExpiresIn })
}

const decodeToken = (token: string): ITokenPayload | null => {
  try {
    const decoded = jwt.verify(token, env.tokenSecret) as ITokenPayload
    return decoded
  } catch {
    return null
  }
}

export default { generateToken, decodeToken }
