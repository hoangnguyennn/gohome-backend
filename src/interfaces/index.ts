import { DistrictTypes, UserTypes, WardTypes } from './enums';

export interface ITokenPayload {
  userId: string;
}

export interface IDistrictRequest {
  name: string;
  type: DistrictTypes;
}

export interface IDistrictResponse {
  id: string;
  name: string;
  type: DistrictTypes;
}

export interface IWardRequest {
  name: string;
  type: WardTypes;
  districtId: string;
}

export interface IWardResponse {
  id: string;
  name: string;
  type: WardTypes;
  district?: IDistrictResponse;
}

export interface IUserResponse {
  id: string;
  username: string;
  fullName?: string;
  avatar?: string;
  type: UserTypes;
  createdAt: string;
}
