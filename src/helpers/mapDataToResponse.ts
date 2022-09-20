import { IUserResponse } from '~/interfaces';
import { IUser } from '~/interfaces/IDocument';

export const mapUserToResponse = (user: IUser): IUserResponse => {
  const { _id, username, fullName, avatar, type, createdAt } = user;
  return {
    id: _id.toString(),
    username,
    fullName,
    avatar,
    type,
    createdAt
  } as IUserResponse;
};
