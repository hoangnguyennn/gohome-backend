import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IDataListFilter, IWardRequest } from '~/interfaces';
import { IWard } from '~/interfaces/IDocument';
import Ward from '~/models/ward.model';
import {
  getLimit,
  getOffset,
  getSortBy,
  getSortDirection
} from '~/utils/getter.util';

const WardService = {
  getList: async (dataListFilter: IDataListFilter<IWard>) => {
    const limit = getLimit(dataListFilter.limit);
    const offset = getOffset(dataListFilter.offset);
    const sortBy = getSortBy(dataListFilter.sortBy);
    const sortDirection = getSortDirection(dataListFilter.sortDirection);

    let query = Ward.find()
      .populate('district')
      .collation({ locale: 'en' })
      .sort('districtId type name');

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

    const wards = await query.exec();
    const total = await Ward.find().count().lean().exec();

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
    return (await Ward.create(ward)).populate('district');
  },
  updateById: async (id: string, wardUpdate: IWardRequest) => {
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
