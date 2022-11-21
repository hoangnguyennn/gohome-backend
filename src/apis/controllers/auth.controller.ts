import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import { mapUserToResponse } from '~/helpers/mapDataToResponse';
import AuthService from '~/services/auth.service';

const AuthController = {
  register: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const { token } = await AuthService.register(username, password);
    return success(res, { token });
  },
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const { token } = await AuthService.login(username, password);
    return success(res, { token });
  },
  me: async (req: Request, res: Response) => {
    const tokenPayload = req.user;
    const user = await AuthService.me(tokenPayload.userId);
    return success(res, { data: mapUserToResponse(user) });
  }
};

export default AuthController;
