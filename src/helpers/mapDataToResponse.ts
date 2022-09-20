import {
  ICategoryResponse,
  IDistrictResponse,
  IUserResponse,
  IWardResponse
} from '~/interfaces';
import { ICategory, IDistrict, IUser, IWard } from '~/interfaces/IDocument';

export const mapUserToResponse = (user: IUser) => {
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

export const mapDistrictToResponse = (district: IDistrict) => {
  const { _id, name, type } = district;
  return { id: _id.toString(), name, type } as IDistrictResponse;
};

export const mapWardToResponse = (ward: IWard) => {
  const { _id, name, type, district } = ward;
  return {
    id: _id.toString(),
    name,
    type,
    district: district && mapDistrictToResponse(district)
  } as IWardResponse;
};

export const mapCategoryToResponse = (category: ICategory) => {
  const { _id, name, code } = category;
  return { id: _id.toString(), name, code } as ICategoryResponse;
};
