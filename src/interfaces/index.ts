import { UserTypes } from './enums';

export interface ITokenPayload {
  userId: string;
}

export interface IUserResponse {
  id: string;
  username: string;
  fullName?: string;
  avatar?: string;
  type: UserTypes;
  createdAt: string;
}
