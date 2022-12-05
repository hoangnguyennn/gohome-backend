import { ERROR_MESSAGES } from '~/constants/errorMessages';
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IUserFilter } from '~/interfaces';
import { UserTypes } from '~/interfaces/enums';
import { IUser } from '~/interfaces/IDocument';
import User from '~/models/user.model';
import {
  getLimit,
  getOffset,
  getSortBy,
  getSortDirection,
  getValue
} from '~/utils/getter.util';

const UserService = {
  getList: async (dataListFilter: IUserFilter) => {
    const limit = getLimit(dataListFilter.limit);
    const offset = getOffset(dataListFilter.offset);
    const sortBy = getSortBy(dataListFilter.sortBy);
    const sortDirection = getSortDirection(dataListFilter.sortDirection);
    const username = getValue(dataListFilter.username);
    const fullName = getValue(dataListFilter.fullName);
    const type =
      (dataListFilter.type as string) in UserTypes
        ? Number(dataListFilter.type)
        : undefined;
    const isVerified =
      dataListFilter.isVerified !== undefined
        ? dataListFilter.isVerified === '1'
        : undefined;

    let query = User.find();
    let queryCount = User.find();

    if (username) {
      query = query.find({ username: new RegExp(username, 'i') });
      queryCount = queryCount.find({ username: new RegExp(username, 'i') });
    }

    if (fullName) {
      query = query.find({ fullName: new RegExp(fullName, 'i') });
      queryCount = queryCount.find({ fullName: new RegExp(fullName, 'i') });
    }

    if (type !== undefined) {
      query = query.find({ type });
      queryCount = queryCount.find({ type });
    }

    if (isVerified !== undefined) {
      query = query.find({ isVerified });
      queryCount = queryCount.find({ isVerified });
    }

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

    const [users, total] = await Promise.all([
      query.exec(),
      queryCount.lean().count().exec()
    ]);

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

    return User.findByIdAndUpdate(
      id,
      { $set: { isVerified: true } },
      { new: true }
    ).exec() as Promise<IUser>;
  }
};

export default UserService;
