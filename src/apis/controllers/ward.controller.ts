import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import { mapWardToResponse } from '~/helpers/mapDataToResponse';
import { IWardRequest } from '~/interfaces';
import WardService from '~/services/ward.service';

const WardController = {
  getList: async (req: Request, res: Response) => {
    const wards = await WardService.getList();
    return success(res, { wards: wards.map(mapWardToResponse) });
  },
  create: async (req: Request, res: Response) => {
    const wardRequest: IWardRequest = req.body;
    const newWard = await WardService.create(wardRequest);
    return success(res, { ward: mapWardToResponse(newWard) });
  }
};

export default WardController;