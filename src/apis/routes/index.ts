import { Router } from 'express';
import authRoute from './auth.route';
import categoryRoute from './category.route';
import districtRoute from './district.route';
import postRoute from './post.route';
import uploadRoute from './upload.route';
import userRoute from './user.route';
import wardRoute from './ward.route';

const router = Router();
router.use('/auth', authRoute);
router.use('/categories', categoryRoute);
router.use('/districts', districtRoute);
router.use('/posts', postRoute);
router.use('/upload', uploadRoute);
router.use('/users', userRoute);
router.use('/wards', wardRoute);

export default router;
