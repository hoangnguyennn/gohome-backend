import { IWardRequest } from '~/interfaces';
import Ward from '~/models/ward.model';

const WardService = {
  getList: () => {
    return Ward.find();
  },
  create: async (ward: IWardRequest) => {
    return (await Ward.create(ward)).populate('district');
  },
  update: () => {
    console.log('update');
  },
  delete: () => {
    console.log('delete');
  },
  hide: () => {
    console.log('hide');
  }
};

export default WardService;
