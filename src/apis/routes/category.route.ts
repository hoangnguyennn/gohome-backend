import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import { checkValidObjectId } from '~/middlewares/objectId.middleware';
import CategoryController from '~/apis/controllers/category.controller';

const router = Router();
router
  .get('/', catcherWrapper(CategoryController.getList))
  .post('/', catcherWrapper(CategoryController.create))
  .get(
    '/:id',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(CategoryController.getById)
  )
  .put(
    '/:id',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(CategoryController.updateById)
  );

export default router;
