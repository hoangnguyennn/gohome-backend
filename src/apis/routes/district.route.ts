import { Router } from 'express'
import catcherWrapper from '~/helpers/catcherWrapper'
import { checkValidObjectId } from '~/middlewares/objectId.middleware'
import DistrictController from '~/apis/controllers/district.controller'
import { celebrate } from 'celebrate'
import { DISTRICT_CREATION_RULES } from '~/validations/district.validate'

const router = Router()

router.get('/', catcherWrapper(DistrictController.getList))

router.post(
  '/',
  celebrate(DISTRICT_CREATION_RULES),
  catcherWrapper(DistrictController.create)
)

router.get(
  '/:id',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(DistrictController.getById)
)

router.put(
  '/:id',
  catcherWrapper(checkValidObjectId),
  celebrate(DISTRICT_CREATION_RULES),
  catcherWrapper(DistrictController.updateById)
)

router.get(
  '/:id/wards',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(DistrictController.getWards)
)

export default router
