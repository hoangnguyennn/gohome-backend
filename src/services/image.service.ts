import { IImageCreate } from '~/interfaces';
import Image from '~/models/image.model';

const ImageService = {
  create: (image: IImageCreate) => {
    return Image.create(image);
  }
};

export default ImageService;
