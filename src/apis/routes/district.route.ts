import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import { checkValidObjectId } from '~/middlewares/objectId.middleware';
import DistrictController from '../controllers/district.controller';

const router = Router();
router.get('/', catcherWrapper(DistrictController.getList));
router.post('/', catcherWrapper(DistrictController.create));
router.get(
  '/:id/wards',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(DistrictController.getWards)
);

export default router;
