import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IDistrictRequest } from '~/interfaces';
import District from '~/models/district.model';
import Ward from '~/models/ward.model';

const DistrictService = {
  getList: () => {
    return District.find().sort('type name');
  },
  getById: async (id: string) => {
    const district = await District.findById(id);

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
    );

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
    return Ward.find({ districtId: districtId });
  }
};

export default DistrictService;
