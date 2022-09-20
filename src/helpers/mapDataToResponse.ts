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
    hiddenAt: post.hiddenAt,
    shownAt: post.shownAt,
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
    url: image.url
  } as IImageResponse;
};
