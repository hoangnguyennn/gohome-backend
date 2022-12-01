import { Schema, model } from 'mongoose';
import { IUser } from '~/interfaces/IDocument';
import { CollectionNames, UserTypes } from '~/interfaces/enums';

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: false },
    avatar: { type: String, required: false },
    type: { type: Number, enum: UserTypes, default: UserTypes.EMPLOYEE },
    isHide: { type: Boolean, default: false },
    deletedAt: { type: Date, required: false },
    isVerified: { type: Boolean, default: false }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

export default model<IUser>(CollectionNames.USER, userSchema);
