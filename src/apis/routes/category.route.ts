import { Router } from 'express'
import catcherWrapper from '~/helpers/catcherWrapper'
import { checkValidObjectId } from '~/middlewares/objectId.middleware'
import CategoryController from '~/apis/controllers/category.controller'
import { celebrate } from 'celebrate'
import {
  CATEGORY_CREATION_RULES,
  CATEGORY_UPDATE_RULES
} from '~/validations/category.validate'

const router = Router()

router.get('/', catcherWrapper(CategoryController.getList))

router.post(
  '/',
  celebrate(CATEGORY_CREATION_RULES),
  catcherWrapper(CategoryController.create)
)

router.get(
  '/:id',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(CategoryController.getById)
)

router.put(
  '/:id',
  catcherWrapper(checkValidObjectId),
  celebrate(CATEGORY_UPDATE_RULES),
  catcherWrapper(CategoryController.updateById)
)

export default router
