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
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const ward = await WardService.getById(id);
    return success(res, { ward: mapWardToResponse(ward) });
  },
  create: async (req: Request, res: Response) => {
    const wardRequest: IWardRequest = req.body;
    const newWard = await WardService.create(wardRequest);
    return success(res, { ward: mapWardToResponse(newWard) });
  },
  updateById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const wardUpdate: IWardRequest = req.body;
    const ward = await WardService.updateById(id, wardUpdate);
    return success(res, { ward: mapWardToResponse(ward) });
  }
};

export default WardController;
