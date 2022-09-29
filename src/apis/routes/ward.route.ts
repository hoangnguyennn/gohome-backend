import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import { checkValidObjectId } from '~/middlewares/objectId.middleware';
import WardController from '../controllers/ward.controller';

const router = Router();
router
  .get('/', catcherWrapper(WardController.getList))
  .post('/', catcherWrapper(WardController.create))
  .get(
    '/:id',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(WardController.getById)
  )
  .put(
    '/:id',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(WardController.updateById)
  );

export default router;
