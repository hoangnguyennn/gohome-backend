import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import AuthController from '../controllers/auth.controller';

const router = Router();
router.post('/login', catcherWrapper(AuthController.login));
router.post('/register', catcherWrapper(AuthController.register));

export default router;
