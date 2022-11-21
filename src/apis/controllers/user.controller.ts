import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import { mapUserToResponse } from '~/helpers/mapDataToResponse';
import UserService from '~/services/user.service';

const UserController = {
  getList: async (req: Request, res: Response) => {
    const users = await UserService.getList();
    return success(res, { users: users.map(mapUserToResponse) });
  },
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await UserService.getById(id);
    return success(res, { user: mapUserToResponse(user) });
  },
  verify: async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await UserService.verify(id);
    return success(res, { user: mapUserToResponse(user) });
  }
};

export default UserController;
