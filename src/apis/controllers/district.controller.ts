import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import {
  mapDistrictToResponse,
  mapWardToResponse
} from '~/helpers/mapDataToResponse';
import { IDistrictRequest } from '~/interfaces';
import DistrictService from '~/services/district.service';

const DistrictController = {
  getList: async (req: Request, res: Response) => {
    const districts = await DistrictService.getList();
    return success(res, { districts: districts.map(mapDistrictToResponse) });
  },
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const district = await DistrictService.getById(id);
    return success(res, { district: mapDistrictToResponse(district) });
  },
  create: async (req: Request, res: Response) => {
    const districtRequest: IDistrictRequest = req.body;
    const newDistrict = await DistrictService.create(districtRequest);
    return success(res, { district: mapDistrictToResponse(newDistrict) });
  },
  updateById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const districtUpdate: IDistrictRequest = req.body;
    const district = await DistrictService.updateById(id, districtUpdate);
    return success(res, { district: mapDistrictToResponse(district) });
  },
  getWards: async (req: Request, res: Response) => {
    const { id } = req.params;
    const wards = await DistrictService.getWards(id);
    return success(res, { wards: wards.map(mapWardToResponse) });
  }
};

export default DistrictController;
