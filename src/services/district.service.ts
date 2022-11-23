import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IDataListFilter, IDistrictRequest } from '~/interfaces';
import { IDistrict } from '~/interfaces/IDocument';
import District from '~/models/district.model';
import Ward from '~/models/ward.model';
import {
  getLimit,
  getOffset,
  getSortBy,
  getSortDirection
} from '~/utils/getter.util';

const DistrictService = {
  getList: async (dataListFilter: IDataListFilter<IDistrict>) => {
    const limit = getLimit(dataListFilter.limit);
    const offset = getOffset(dataListFilter.offset);
    const sortBy = getSortBy(dataListFilter.sortBy);
    const sortDirection = getSortDirection(dataListFilter.sortDirection);

    let query = District.find().collation({ locale: 'en' }).sort('type name');

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

    const districts = await query.exec();
    const total = await District.find().lean().count().exec();

    return { data: districts, total };
  },
  getById: async (id: string) => {
    const district = await District.findById(id).exec();

    if (!district) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return district;
  },
  create: (district: IDistrictRequest) => {
    return District.create(district);
  },
  updateById: async (id: string, districtUpdate: IDistrictRequest) => {
    const district = await District.findByIdAndUpdate(
      id,
      { $set: districtUpdate },
      { new: true }
    ).exec();

    if (!district) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return district;
  },
  delete: () => {
    console.log('delete');
  },
  hide: () => {
    console.log('hide');
  },
  getWards: (districtId: string) => {
    return Ward.find({ districtId: districtId }).exec();
  }
};

export default DistrictService;
