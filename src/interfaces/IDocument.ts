import { Document, Types } from 'mongoose';
import {
  DistrictTypes,
  PostVerifyStatuses,
  UserTypes,
  WardTypes
} from './enums';

export interface BaseDocument extends Document {
  isHide: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IUser extends BaseDocument {
  username: string;
  password: string;
  fullName?: string;
  avatar?: string;
  type: UserTypes;
}

export interface IPost extends BaseDocument {
  code: string;
  title: string;
  slug: string;
  categoryId: Types.ObjectId;
  wardId: Types.ObjectId;
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
  createdById: Types.ObjectId;
  updatedById?: Types.ObjectId;
  rentedAt?: Date;
  openedForRentAt: Date;
  imagesId: Types.ObjectId[];

  category?: ICategory;
  ward?: IWard;
  createdBy?: IUser;
  updatedBy?: IUser;
  images?: IImage[];
}

export interface IWard extends BaseDocument {
  name: string;
  type: WardTypes;
  districtId: Types.ObjectId;

  district?: IDistrict;
}

export interface IDistrict extends BaseDocument {
  name: string;
  type: DistrictTypes;
}

export interface ICategory extends BaseDocument {
  name: string;
  code: string;
  count: number;
}

export interface IImage extends BaseDocument {
  url: string;
  originalUrl: string;
  publicId: string;
}
