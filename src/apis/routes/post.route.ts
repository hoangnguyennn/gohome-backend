import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import { checkAuth } from '~/middlewares/auth.middleware';
import { checkValidObjectId } from '~/middlewares/objectId.middleware';
import PostController from '../controllers/post.controller';

const router = Router();
router
  .use(catcherWrapper(checkAuth))

  .get('/', catcherWrapper(PostController.getList))
  .post('/', catcherWrapper(PostController.create))
  .get('/rented', catcherWrapper(PostController.getRentedList))

  .post(
    '/:id/approve',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(PostController.approve)
  )
  .post(
    '/:id/deny',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(PostController.deny)
  )
  .post(
    '/:id/mark-as-rented',
    catcherWrapper(checkValidObjectId),
    catcherWrapper(PostController.markAsRented)
  );

export default router;
