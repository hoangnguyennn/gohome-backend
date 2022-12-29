import { Request, Response } from 'express'
import { success } from '~/helpers/commonResponse'
import { mapUserToResponse } from '~/helpers/mapDataToResponse'
import {
  IChangePasswordRequest,
  ITokenPayload,
  IUserRequest
} from '~/interfaces'
import AccountService from '~/services/account.service'

const AccountController = {
  updateInfo: async (req: Request, res: Response) => {
    const { userId } = req.user as ITokenPayload
    const userInfo: IUserRequest = req.body
    const user = await AccountService.updateInfo(userId, userInfo)
    return success(res, { data: mapUserToResponse(user) })
  },
  changePassword: async (req: Request, res: Response) => {
    const { userId } = req.user as ITokenPayload
    const changePasswordRequest: IChangePasswordRequest = req.body
    const user = await AccountService.changePassword(
      userId,
      changePasswordRequest
    )
    return success(res, { data: mapUserToResponse(user) })
  }
}

export default AccountController
