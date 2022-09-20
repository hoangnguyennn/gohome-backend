import { Router } from 'express';
import authRoute from './auth.route';
import districtRoute from './district.route';
import wardRoute from './ward.route';

const router = Router();
router.use('/auth', authRoute);
router.use('/districts', districtRoute);
router.use('/wards', wardRoute);

export default router;
