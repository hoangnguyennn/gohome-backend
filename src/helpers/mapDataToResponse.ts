import {
  ICategoryResponse,
  IDistrictResponse,
  IImageResponse,
  IPostResponse,
  IUserResponse,
  IWardResponse
} from '~/interfaces';
import {
  ICategory,
  IDistrict,
  IImage,
  IPost,
  IUser,
  IWard
} from '~/interfaces/IDocument';

export const mapUserToResponse = (user: IUser) => {
  return {
    id: user._id.toString(),
    username: user.username,
    fullName: user.fullName,
    avatar: user.avatar,
    type: user.type,
    isHide: user.isHide,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  } as IUserResponse;
};

export const mapDistrictToResponse = (district: IDistrict) => {
  return {
    id: district._id.toString(),
    name: district.name,
    type: district.type,
    isHide: district.isHide,
    createdAt: district.createdAt,
    updatedAt: district.updatedAt
  } as IDistrictResponse;
};

export const mapWardToResponse = (ward: IWard) => {
  return {
    id: ward._id.toString(),
    name: ward.name,
    type: ward.type,
    district: ward.district && mapDistrictToResponse(ward.district),
    isHide: ward.isHide,
    createdAt: ward.createdAt,
    updatedAt: ward.updatedAt
  } as IWardResponse;
};

export const mapCategoryToResponse = (category: ICategory) => {
  return {
    id: category._id.toString(),
    name: category.name,
    code: category.code,
    isHide: category.isHide,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  } as ICategoryResponse;
};

export const mapPostToResponse = (post: IPost) => {
  return {
    id: post._id.toString(),
    code: post.code,
    title: post.title,
    slug: post.slug,
    price: post.price,
    commission: post.commission,
    acreage: post.acreage,
    bedroom: post.bedroom,
    bathroom: post.bathroom,
    floor: post.floor,
    description: post.description,
    ownerName: post.ownerName,
    ownerPhone: post.ownerPhone,
    ownerAddress: post.ownerAddress,
    verifyStatus: post.verifyStatus,
    denyReason: post.denyReason,
    isCheap: post.isCheap,
    isFeatured: post.isFeatured,
    isRented: post.isRented,
    isHide: post.isHide,
    rentedAt: post.rentedAt,
    openedForRentAt: post.openedForRentAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    category: post.category && mapCategoryToResponse(post.category),
    ward: post.ward && mapWardToResponse(post.ward),
    createdBy: post.createdBy && mapUserToResponse(post.createdBy),
    updatedBy: post.updatedBy && mapUserToResponse(post.updatedBy),
    images: post.images && post.images.map(mapImageToResponse)
  } as IPostResponse;
};

export const mapImageToResponse = (image: IImage) => {
  return {
    id: image._id.toString(),
    url: image.url,
    isHide: image.isHide,
    createdAt: image.createdAt,
    updatedAt: image.updatedAt
  } as IImageResponse;
};
