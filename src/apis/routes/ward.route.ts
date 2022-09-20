import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import WardController from '../controllers/ward.controller';

const router = Router();
router.get('/', catcherWrapper(WardController.getList));
router.post('/', catcherWrapper(WardController.create));

export default router;
