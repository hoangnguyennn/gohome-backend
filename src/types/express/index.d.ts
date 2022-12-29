import { ITokenPayload } from '~/interfaces/index'

declare global {
  namespace Express {
    interface Request {
      user?: ITokenPayload
    }
  }
}
