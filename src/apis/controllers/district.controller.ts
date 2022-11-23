import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import {
  mapDistrictToResponse,
  mapWardToResponse
} from '~/helpers/mapDataToResponse';
import { IDistrictFilter, IDistrictRequest } from '~/interfaces';
import DistrictService from '~/services/district.service';

const DistrictController = {
  getList: async (req: Request, res: Response) => {
    const dataListFilter: IDistrictFilter = req.query;
    const { total, data } = await DistrictService.getList(dataListFilter);
    return success(res, { total, data: data.map(mapDistrictToResponse) });
  },
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const district = await DistrictService.getById(id);
    return success(res, { data: mapDistrictToResponse(district) });
  },
  create: async (req: Request, res: Response) => {
    const districtRequest: IDistrictRequest = req.body;
    const newDistrict = await DistrictService.create(districtRequest);
    return success(res, { data: mapDistrictToResponse(newDistrict) });
  },
  updateById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const districtUpdate: IDistrictRequest = req.body;
    const district = await DistrictService.updateById(id, districtUpdate);
    return success(res, { data: mapDistrictToResponse(district) });
  },
  getWards: async (req: Request, res: Response) => {
    const { id } = req.params;
    const wards = await DistrictService.getWards(id);
    return success(res, { data: wards.map(mapWardToResponse) });
  }
};

export default DistrictController;
