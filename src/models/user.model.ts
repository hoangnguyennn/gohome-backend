import { Schema, model } from 'mongoose';
import { IUser } from '~/interfaces/IDocument';
import { CollectionNames } from '~/interfaces/enums';

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  fullName: { type: String, required: true },
});

export default model<IUser>(CollectionNames.USER, userSchema);
