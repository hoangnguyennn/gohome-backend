import { IDistrictRequest } from '~/interfaces';
import District from '~/models/district.model';
import Ward from '~/models/ward.model';

const DistrictService = {
  getList: () => {
    return District.find().sort('type name');
  },
  create: (district: IDistrictRequest) => {
    return District.create(district);
  },
  update: () => {
    console.log('update');
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
