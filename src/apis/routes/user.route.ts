import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import UserController from '../controllers/user.controller';

const router = Router();
router.get('/', catcherWrapper(UserController.getList));

export default router;
