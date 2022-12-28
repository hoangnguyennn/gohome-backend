import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import { checkValidObjectId } from '~/middlewares/objectId.middleware';
import WardController from '~/apis/controllers/ward.controller';

const router = Router();

router.get('/', catcherWrapper(WardController.getList));

router.post('/', catcherWrapper(WardController.create));

router.get(
  '/:id',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(WardController.getById)
);

router.put(
  '/:id',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(WardController.updateById)
);

export default router;
