export interface IUser extends Document {
  username: string;
  hashedPassword: string;
  fullName: string;
}
