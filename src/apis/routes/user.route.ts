import { Router } from 'express'
import catcherWrapper from '~/helpers/catcherWrapper'
import { checkValidObjectId } from '~/middlewares/objectId.middleware'
import UserController from '~/apis/controllers/user.controller'

const router = Router()

router.get('/', catcherWrapper(UserController.getList))

router.get(
  '/:id',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(UserController.getById)
)

router.post(
  '/:id/verify',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(UserController.verify)
)

export default router
