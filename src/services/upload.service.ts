import { v2 as cloudinaryV2 } from 'cloudinary';
import fs from 'fs';
import env from '~/configs/env';

cloudinaryV2.config({
  cloud_name: env.cloudinaryName,
  api_key: env.cloudinaryKey,
  api_secret: env.cloudinarySecret
});

const UploadService = {
  uploadSingle: async (filePath: string) => {
    return cloudinaryV2.uploader.upload(filePath).then(res => {
      fs.unlinkSync(filePath);
      return {
        url: res.secure_url,
        publicId: res.public_id
      };
    });
  }
};

export default UploadService;
