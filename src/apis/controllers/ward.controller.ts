import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import { mapWardToResponse } from '~/helpers/mapDataToResponse';
import { IDataListFilter, IWardRequest } from '~/interfaces';
import WardService from '~/services/ward.service';

const WardController = {
  getList: async (req: Request, res: Response) => {
    const dataListFilter: IDataListFilter = req.query;
    const { total, data } = await WardService.getList(dataListFilter);
    return success(res, { total, data: data.map(mapWardToResponse) });
  },
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const ward = await WardService.getById(id);
    return success(res, { data: mapWardToResponse(ward) });
  },
  create: async (req: Request, res: Response) => {
    const wardRequest: IWardRequest = req.body;
    const newWard = await WardService.create(wardRequest);
    return success(res, { data: mapWardToResponse(newWard) });
  },
  updateById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const wardUpdate: IWardRequest = req.body;
    const ward = await WardService.updateById(id, wardUpdate);
    return success(res, { data: mapWardToResponse(ward) });
  }
};

export default WardController;
