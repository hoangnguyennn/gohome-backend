import { Router } from 'express';
import authRoute from './auth.route';
import districtRoute from './district.route';
import wardRoute from './ward.route';
import categoryRoute from './category.route';
import postRoute from './post.route';
import uploadRoute from './upload.route';

const router = Router();
router.use('/auth', authRoute);
router.use('/districts', districtRoute);
router.use('/wards', wardRoute);
router.use('/categories', categoryRoute);
router.use('/posts', postRoute);
router.use('/upload', uploadRoute);

export default router;
