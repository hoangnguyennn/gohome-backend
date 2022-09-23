import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import { mapUserToResponse } from '~/helpers/mapDataToResponse';
import UserService from '~/services/user.service';

const UserController = {
  getList: async (req: Request, res: Response) => {
    const users = await UserService.getList();
    return success(res, { users: users.map(mapUserToResponse) });
  }
};

export default UserController;
