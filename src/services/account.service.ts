import {
  HttpError,
  COMMON_MESSAGE,
  HTTP_STATUS
} from '~/helpers/commonResponse'
import { IChangePasswordRequest, IUserRequest } from '~/interfaces'
import User from '~/models/user.model'
import bcryptUtil from '~/utils/bcrypt.util'

const AccountService = {
  updateInfo: async (userId: string, userInfo: Partial<IUserRequest>) => {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: userInfo },
      { new: true }
    ).exec()

    if (!user) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    }

    return user
  },
  changePassword: async (
    userId: string,
    changePasswordRequest: IChangePasswordRequest
  ) => {
    const hashedPassword = await bcryptUtil.getHashed(
      changePasswordRequest.newPassword
    )
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { password: hashedPassword } },
      { new: true }
    ).exec()

    if (!user) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    }

    return user
  }
}

export default AccountService
