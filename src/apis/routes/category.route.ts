import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import CategoryController from '../controllers/category.controller';

const router = Router();
router.get('/', catcherWrapper(CategoryController.getList));
router.post('/', catcherWrapper(CategoryController.create));

export default router;
