import {
  DistrictTypes,
  PostVerifyStatuses,
  UserTypes,
  WardTypes
} from './enums';

export interface ITokenPayload {
  userId: string;
}

export interface ICategoryRequest {
  name: string;
  code: string;
}

export interface IBaseResponse {
  id: string;
  isHide: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryResponse extends IBaseResponse {
  name: string;
  code: string;
}

export interface IDistrictRequest {
  name: string;
  type: DistrictTypes;
}

export interface IDistrictResponse extends IBaseResponse {
  name: string;
  type: DistrictTypes;
}

export interface IWardRequest {
  name: string;
  type: WardTypes;
  districtId: string;
}

export interface IWardResponse extends IBaseResponse {
  name: string;
  type: WardTypes;
  district?: IDistrictResponse;
}

export interface IPostRequest {
  title: string;
  categoryId: string;
  wardId: string;
  price: number;
  commission: number;
  acreage: number;
  bedroom: number;
  bathroom: number;
  floor: number;
  description: string;
  ownerName: string;
  ownerPhone: string;
  ownerAddress: string;
  isCheap: boolean;
  isFeatured: boolean;
  imagesId: string[];
}

export interface IPostCreate extends IPostRequest {
  verifyStatus: PostVerifyStatuses;
  createdById: string;
}

export interface IPostUpdate extends IPostRequest {
  verifyStatus: PostVerifyStatuses;
  updatedById: string;
}

export interface IPostResponse extends IBaseResponse {
  code: string;
  title: string;
  slug: string;
  price: number;
  commission: number;
  acreage: number;
  bedroom: number;
  bathroom: number;
  floor: number;
  description: string;
  ownerName: string;
  ownerPhone: string;
  ownerAddress: string;
  verifyStatus: PostVerifyStatuses;
  denyReason: string;
  isCheap: boolean;
  isFeatured: boolean;
  isRented: boolean;
  hiddenAt?: string;
  shownAt: string;

  category?: ICategoryResponse;
  ward?: IWardResponse;
  createdBy?: IUserResponse;
  updatedBy?: IUserResponse;
  images?: IImageResponse[];
}

export interface IUserResponse extends IBaseResponse {
  username: string;
  fullName?: string;
  avatar?: string;
  type: UserTypes;
  createdAt: string;
}

export interface IImageCreate {
  url: string;
  originalUrl: string;
  publicId: string;
}

export interface IImageResponse extends IBaseResponse {
  url: string;
}
