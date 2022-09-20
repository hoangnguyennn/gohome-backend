import { Router } from 'express';
import catcherWrapper from '~/helpers/catcherWrapper';
import { checkAuth } from '~/middlewares/auth.middleware';
import PostController from '../controllers/post.controller';

const router = Router();
router.get('/', catcherWrapper(PostController.getList));
router.post(
  '/',
  catcherWrapper(checkAuth),
  catcherWrapper(PostController.create)
);

export default router;
