import { Request, Response } from 'express'
import { success } from '~/helpers/commonResponse'
import { mapImageToResponse } from '~/helpers/mapDataToResponse'
import { IImageCreate } from '~/interfaces'
import ImageService from '~/services/image.service'
import UploadService from '~/services/upload.service'

const UploadController = {
  upload: async (req: Request, res: Response) => {
    const { path: filename } = req.file as Express.Multer.File
    const { url, publicId } = await UploadService.uploadSingle(filename)

    const image: IImageCreate = { url: url, originalUrl: url, publicId }
    const newImage = await ImageService.create(image)
    return success(res, { data: mapImageToResponse(newImage) })
  }
}

export default UploadController
