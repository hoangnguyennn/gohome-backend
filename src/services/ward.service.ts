import { ERROR_MESSAGES } from '~/constants/errorMessages';
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IWardFilter, IWardRequest } from '~/interfaces';
import District from '~/models/district.model';
import Ward from '~/models/ward.model';
import {
  getLimit,
  getOffset,
  getSortBy,
  getSortDirection,
  getValue
} from '~/utils/getter.util';

const WardService = {
  getList: async (dataListFilter: IWardFilter) => {
    const limit = getLimit(dataListFilter.limit);
    const offset = getOffset(dataListFilter.offset);
    const sortBy = getSortBy(dataListFilter.sortBy);
    const sortDirection = getSortDirection(dataListFilter.sortDirection);
    const name = getValue(dataListFilter.name);
    const type = getValue(dataListFilter.type);
    const districtId = getValue(dataListFilter.districtId);

    let query = Ward.find()
      .populate('district')
      .collation({ locale: 'en' })
      .sort('districtId type name');
    let queryCount = Ward.find();

    if (name) {
      query = query.find({ name: new RegExp(name, 'i') });
      queryCount = queryCount.find({ name: new RegExp(name, 'i') });
    }

    if (type) {
      query = query.find({ type });
      queryCount = queryCount.find({ type });
    }

    if (districtId) {
      query = query.find({ districtId });
      queryCount = queryCount.find({ districtId });
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

    const [wards, total] = await Promise.all([
      query.exec(),
      queryCount.count().lean().exec()
    ]);

    return { data: wards, total };
  },
  getById: async (id: string) => {
    const ward = await Ward.findById(id)
      .populate('district')
      .collation({ locale: 'en' })
      .sort('districtId type name')
      .exec();

    if (!ward) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return ward;
  },
  create: async (ward: IWardRequest) => {
    const district = await District.findById(ward.districtId).exec();

    if (!district) {
      throw new HttpError(
        ERROR_MESSAGES.DISTRICT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return (await Ward.create(ward)).populate('district');
  },
  updateById: async (id: string, wardUpdate: IWardRequest) => {
    const district = await District.findById(wardUpdate.districtId).exec();

    if (!district) {
      throw new HttpError(
        ERROR_MESSAGES.DISTRICT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const ward = await Ward.findByIdAndUpdate(
      id,
      { $set: wardUpdate },
      { new: true }
    )
      .populate('district')
      .collation({ locale: 'en' })
      .sort('districtId type name')
      .exec();

    if (!ward) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return ward;
  },
  delete: () => {
    console.log('delete');
  },
  hide: () => {
    console.log('hide');
  }
};

export default WardService;
