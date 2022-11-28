import {
  DistrictTypes,
  PostVerifyStatuses,
  UserTypes,
  WardTypes
} from './enums';
import { IDistrict, IUser, IWard } from './IDocument';

export interface IBaseResponse {
  id: string;
  isHide: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryFilter extends IDataListFilter<IDistrict> {
  name?: string;
  code?: string;
}

export interface ICategoryRequest {
  name: string;
  code: string;
}

export interface ICategoryResponse extends IBaseResponse {
  name: string;
  code: string;
}

export interface IChangePasswordRequest {
  newPassword: string;
}

export interface IDataListFilter<T = any> {
  limit?: number;
  offset?: number;
  sortBy?: keyof T;
  sortDirection?: DataListSortDirection;
}

export interface IDataListResponse<T> {
  data: T[];
  total: number;
}

export interface IDistrictFilter extends IDataListFilter<IDistrict> {
  name?: string;
  type?: string;
}

export interface IDistrictRequest {
  name: string;
  type: DistrictTypes;
}

export interface IDistrictResponse extends IBaseResponse {
  name: string;
  type: DistrictTypes;
}

export interface IImageCreate {
  url: string;
  originalUrl: string;
  publicId: string;
}

export interface IImageResponse extends IBaseResponse {
  url: string;
}

export interface IPostFilter extends IDataListFilter<IDistrict> {
  code?: string;
  title?: string;
  createdById?: string;
  verifyStatus?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  updatedAtStart?: string;
  updatedAtEnd?: string;
  categoryIds?: string | string[];
  locationIds?: string | string[];
  ownerPhone?: string;
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
  isRented?: boolean;
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
  rentedAt?: Date;
  openedForRentAt: Date;

  category?: ICategoryResponse;
  ward?: IWardResponse;
  createdBy?: IUserResponse;
  updatedBy?: IUserResponse;
  images?: IImageResponse[];
}

export interface ITokenPayload {
  userId: string;
}

export interface IUserFilter extends IDataListFilter<IUser> {
  username?: string;
  fullName?: string;
  type?: string;
  isVerified?: string;
}

export interface IUserRequest {
  fullName?: string;
  avatar?: string;
}

export interface IUserResponse extends IBaseResponse {
  username: string;
  fullName?: string;
  avatar?: string;
  type: UserTypes;
  isVerified: boolean;
}

export interface IWardFilter extends IDataListFilter<IWard> {
  name?: string;
  type?: string;
  districtId?: string;
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

export type DataListSortDirection = 'descend' | 'ascend';

export type Nullable<T> = T | null;
