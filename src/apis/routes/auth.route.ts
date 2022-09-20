import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import { checkAuth } from '~/middlewares/auth.middleware';
import AuthController from '~/apis/controllers/auth.controller';

const router = Router();
router.post('/login', catcherWrapper(AuthController.login));
router.post('/register', catcherWrapper(AuthController.register));
router.get('/me', catcherWrapper(checkAuth), catcherWrapper(AuthController.me));

export default router;
