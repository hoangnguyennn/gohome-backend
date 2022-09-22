import { Schema, model } from 'mongoose';
import { CollectionNames } from '~/interfaces/enums';
import { IImage } from '~/interfaces/IDocument';

const imageSchema = new Schema<IImage>(
  {
    url: { type: String, required: true },
    originalUrl: { type: String, required: true },
    isHide: { type: Boolean, default: false },
    deletedAt: { type: String, required: false }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

export default model<IImage>(CollectionNames.IMAGE, imageSchema);
