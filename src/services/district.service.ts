import { DATA_LIST_LIMIT_DEFAULT } from '~/constants';
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IDataListFilter, IDistrictRequest } from '~/interfaces';
import District from '~/models/district.model';
import Ward from '~/models/ward.model';

const DistrictService = {
  getList: async (dataListFilter: IDataListFilter) => {
    const limit = dataListFilter.limit || DATA_LIST_LIMIT_DEFAULT;
    const offset = dataListFilter.offset || 0;

    const districts = await District.find()
      .sort('type name')
      .limit(limit)
      .skip(offset)
      .exec();

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
