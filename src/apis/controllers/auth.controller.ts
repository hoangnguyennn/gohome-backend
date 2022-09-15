import { Request, Response } from 'express';
import AuthService from '~/services/auth.service';

const AuthController = {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const { token } = await AuthService.login(username, password);

    return res.status(200).json({ token });
  },
  register: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const { token } = await AuthService.register(username, password);

    return res.status(200).json({ token });
  },
};

export default AuthController;
