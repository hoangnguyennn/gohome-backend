import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import { checkValidObjectId } from '~/middlewares/objectId.middleware';
import DistrictController from '~/apis/controllers/district.controller';

const router = Router();
router
  .get('/', catcherWrapper(DistrictController.getList))
  .post('/', catcherWrapper(DistrictController.create))
  .get(
    '/:id',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(DistrictController.getById)
  )
  .put(
    '/:id',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(DistrictController.updateById)
  )
  .get(
    '/:id/wards',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(DistrictController.getWards)
  );

export default router;
