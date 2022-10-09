import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import { checkValidObjectId } from '~/middlewares/objectId.middleware';
import UserController from '~/apis/controllers/user.controller';

const router = Router();
router
  .get('/', catcherWrapper(UserController.getList))
  .get(
    '/:id',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(UserController.getById)
  )
  .post(
    '/:id/verify',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(UserController.verify)
  );

export default router;
