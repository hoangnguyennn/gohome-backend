import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import catcherWrapper from '~/helpers/catcherWrapper';
import { getNewId } from '~/utils/converter';
import UploadController from '~/apis/controllers/upload.controller';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const basename = getNewId();
    cb(null, `${basename}${extension}`);
  }
});
const upload = multer({ storage });

const router = Router();

router.post(
  '/',
  upload.single('image'),
  catcherWrapper(UploadController.upload)
);

export default router;
