import { Schema, model } from 'mongoose';
import { CollectionNames } from '~/interfaces/enums';
import { ICategory } from '~/interfaces/IDocument';

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    count: { type: Number, default: 0 }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

export default model<ICategory>(CollectionNames.CATEGORY, categorySchema);
