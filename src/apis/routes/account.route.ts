import { Router } from 'express';
import { celebrate } from 'celebrate';

import catcherWrapper from '~/helpers/catcherWrapper';
import { checkAuth } from '~/middlewares/auth.middleware';
import AccountController from '~/apis/controllers/account.controller';
import {
  CHANGE_PASSWORD_RULES,
  UPDATE_INFO_RULES
} from '~/validations/account.valudate';

const router = Router();

router.use(catcherWrapper(checkAuth));

router.post(
  '/update-info',
  celebrate(UPDATE_INFO_RULES),
  catcherWrapper(AccountController.updateInfo)
);

router.post(
  '/change-password',
  celebrate(CHANGE_PASSWORD_RULES),
  catcherWrapper(AccountController.changePassword)
);

export default router;
