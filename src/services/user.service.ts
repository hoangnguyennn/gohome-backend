import { AggregateOptions } from 'mongodb';
import { PipelineStage } from 'mongoose';
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

    const pipelineState: PipelineStage[] = [];
    const pipelineStateCount: PipelineStage[] = [];
    const aggregateOptions: AggregateOptions = { collation: { locale: 'vi' } };

    if (fullName) {
      pipelineState.push({
        $match: {
          $or: [
            { $text: { $search: `"${fullName}"` } },
            { fullName: { $regex: new RegExp(fullName, 'i') } }
          ]
        }
      });
      pipelineStateCount.push({
        $match: {
          $or: [
            { $text: { $search: `"${fullName}"` } },
            { fullName: { $regex: new RegExp(fullName, 'i') } }
          ]
        }
      });
    }

    if (username) {
      pipelineState.push({
        $match: { username: { $regex: new RegExp(username, 'i') } }
      });
      pipelineStateCount.push({
        $match: { username: { $regex: new RegExp(username, 'i') } }
      });
    }

    if (type !== undefined) {
      pipelineState.push({ $match: { type } });
      pipelineStateCount.push({ $match: { type } });
    }

    if (isVerified !== undefined) {
      pipelineState.push({ $match: { isVerified } });
      pipelineStateCount.push({ $match: { isVerified } });
    }

    if (sortBy && sortDirection) {
      pipelineState.push({ $sort: { [sortBy]: sortDirection } });
    }

    if (offset) {
      pipelineState.push({ $skip: offset });
    }

    if (limit) {
      pipelineState.push({ $limit: limit });
    }

    pipelineStateCount.push({ $count: 'total' });

    const [users, count] = await Promise.all([
      pipelineState.length
        ? User.aggregate(pipelineState, aggregateOptions).exec()
        : User.find().exec(),
      User.aggregate(pipelineStateCount).exec()
    ]);

    return { data: users as IUser[], total: count[0]?.total || 0 };
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
