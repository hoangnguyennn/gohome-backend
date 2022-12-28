import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import { checkAuth } from '~/middlewares/auth.middleware';
import { checkValidObjectId } from '~/middlewares/objectId.middleware';
import PostController from '~/apis/controllers/post.controller';
import { celebrate } from 'celebrate';
import {
  POST_CREATION_RULES,
  POST_UPDATE_RULES
} from '~/validations/post.validate';

const router = Router();
router.use(catcherWrapper(checkAuth));

router.get('/', catcherWrapper(PostController.getList));

router.post(
  '/',
  celebrate(POST_CREATION_RULES),
  catcherWrapper(PostController.create)
);

router.get('/rented', catcherWrapper(PostController.getRentedList));

router.get(
  '/:id',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(PostController.getById)
);

router.put(
  '/:id',
  celebrate(POST_UPDATE_RULES),
  catcherWrapper(checkValidObjectId),
  catcherWrapper(PostController.updateById)
);

router.post(
  '/:id/approve',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(PostController.approve)
);

router.post(
  '/:id/deny',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(PostController.deny)
);

router.post(
  '/:id/mark-as-rented',
  catcherWrapper(checkValidObjectId),
  catcherWrapper(PostController.markAsRented)
);

export default router;
