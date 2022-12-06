import { Schema, model } from 'mongoose';
import { CollectionNames, DistrictTypes } from '~/interfaces/enums';
import { IDistrict } from '~/interfaces/IDocument';

const districtSchema = new Schema<IDistrict>(
  {
    name: { type: String, required: true, unique: true, index: true },
    type: { type: String, enum: DistrictTypes, required: true },
    isHide: { type: Boolean, default: false },
    deletedAt: { type: Date, required: false }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

districtSchema.index({ name: 'text' });

export default model<IDistrict>(CollectionNames.DISTRICT, districtSchema);
