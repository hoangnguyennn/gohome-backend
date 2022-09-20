import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import { mapImageToResponse } from '~/helpers/mapDataToResponse';
import { IImageCreate } from '~/interfaces';
import ImageService from '~/services/image.service';

const UploadController = {
  upload: async (req: Request, res: Response) => {
    const filename = req.file.path;
    const image: IImageCreate = { url: filename, originalUrl: filename };
    const newImage = await ImageService.create(image);
    return success(res, { image: mapImageToResponse(newImage) });
  }
};

export default UploadController;
