import { ERROR_MESSAGES } from '~/constants/errorMessages';
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IDataListFilter } from '~/interfaces';
import { IUser } from '~/interfaces/IDocument';
import User from '~/models/user.model';
import {
  getLimit,
  getOffset,
  getSortBy,
  getSortDirection
} from '~/utils/getter.util';

const UserService = {
  getList: async (dataListFilter: IDataListFilter<IUser>) => {
    const limit = getLimit(dataListFilter.limit);
    const offset = getOffset(dataListFilter.offset);
    const sortBy = getSortBy(dataListFilter.sortBy);
    const sortDirection = getSortDirection(dataListFilter.sortDirection);

    let query = User.find();

    if (sortBy && sortDirection) {
      query = query
        .collation({ locale: 'en' })
        .sort({ [sortBy]: sortDirection });
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.skip(offset);
    }

    const users = await query.exec();
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
