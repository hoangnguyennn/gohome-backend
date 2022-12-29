import { Router } from 'express'
import catcherWrapper from '~/helpers/catcherWrapper'
import { checkAuth } from '~/middlewares/auth.middleware'
import AuthController from '~/apis/controllers/auth.controller'
import { celebrate } from 'celebrate'
import { LOGIN_RULES, REGISTER_RULES } from '~/validations/auth.validate'

const router = Router()

router.post(
  '/login',
  celebrate(LOGIN_RULES),
  catcherWrapper(AuthController.login)
)

router.post(
  '/register',
  celebrate(REGISTER_RULES),
  catcherWrapper(AuthController.register)
)

router.get('/me', catcherWrapper(checkAuth), catcherWrapper(AuthController.me))

export default router
