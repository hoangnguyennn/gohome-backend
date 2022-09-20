import { Schema, model } from 'mongoose';
import { CollectionNames, DistrictTypes } from '~/interfaces/enums';
import { IDistrict } from '~/interfaces/IDocument';

const districtSchema = new Schema<IDistrict>(
  {
    name: { type: String, required: true },
    type: { type: String, enum: DistrictTypes, required: true }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

export default model<IDistrict>(CollectionNames.DISTRICT, districtSchema);
