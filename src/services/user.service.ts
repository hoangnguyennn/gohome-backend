import { DATA_LIST_LIMIT_DEFAULT } from '~/constants';
import { ERROR_MESSAGES } from '~/constants/errorMessages';
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IDataListFilter } from '~/interfaces';
import User from '~/models/user.model';

const UserService = {
  getList: async (dataListFilter: IDataListFilter) => {
    const limit = dataListFilter.limit || DATA_LIST_LIMIT_DEFAULT;
    const offset = dataListFilter.offset || 0;

    const users = await User.find().limit(limit).skip(offset).exec();
    const total = await User.find().lean().count().exec();

    return { data: users, total };
  },
  getById: async (id: string) => {
    const user = await User.findById(id).exec();

    if (!user) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return user;
  },
  verify: async (id: string) => {
    const user = await User.findById(id).exec();

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
    ).exec();

    return userUpdated;
  }
};

export default UserService;
