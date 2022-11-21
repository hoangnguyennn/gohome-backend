import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import { mapUserToResponse } from '~/helpers/mapDataToResponse';
import { IDataListFilter } from '~/interfaces';
import UserService from '~/services/user.service';

const UserController = {
  getList: async (req: Request, res: Response) => {
    const dataListFilter: IDataListFilter = req.query;
    const { total, data } = await UserService.getList(dataListFilter);
    return success(res, { total, data: data.map(mapUserToResponse) });
  },
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await UserService.getById(id);
    return success(res, { data: mapUserToResponse(user) });
  },
  verify: async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await UserService.verify(id);
    return success(res, { data: mapUserToResponse(user) });
  }
};

export default UserController;
