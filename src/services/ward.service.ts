import { DATA_LIST_LIMIT_DEFAULT } from '~/constants';
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IDataListFilter, IWardRequest } from '~/interfaces';
import Ward from '~/models/ward.model';

const WardService = {
  getList: async (dataListFilter: IDataListFilter) => {
    const limit = dataListFilter.limit || DATA_LIST_LIMIT_DEFAULT;
    const offset = dataListFilter.offset || 0;

    const wards = await Ward.find()
      .populate('district')
      .sort('districtId type name')
      .limit(limit)
      .skip(offset)
      .exec();

    const total = await Ward.find().count().lean().exec();

    return { data: wards, total };
  },
  getById: async (id: string) => {
    const ward = await Ward.findById(id)
      .populate('district')
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
    ).exec();

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
