import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import { checkAuth } from '~/middlewares/auth.middleware';
import AccountController from '../controllers/account.controller';

const router = Router();

router
  .use(catcherWrapper(checkAuth))
  .post('/update-info', catcherWrapper(AccountController.updateInfo))
  .post('/change-password', catcherWrapper(AccountController.changePassword));

export default router;
