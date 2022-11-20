import { ERROR_MESSAGES } from '~/constants/errorMessages';
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import User from '~/models/user.model';

const UserService = {
  getList: () => {
    return User.find();
  },
  getById: async (id: string) => {
    const user = await User.findById(id);

    if (!user) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return user;
  },
  verify: async (id: string) => {
    const user = await User.findById(id);

    if (!user) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (user.isVerified) {
      throw new HttpError(
        ERROR_MESSAGES.USER_VERIFIED_BEFORE,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const userUpdated = await User.findByIdAndUpdate(
      id,
      { $set: { isVerified: true } },
      { new: true }
    );

    return userUpdated;
  }
};

export default UserService;
