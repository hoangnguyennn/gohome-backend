import { AggregateOptions } from 'mongodb';
import { PipelineStage } from 'mongoose';
import { DATA_TYPES } from '~/constants';
import { ERROR_MESSAGES } from '~/constants/errorMessages';
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IPostCreate, IPostFilter, IPostUpdate } from '~/interfaces';
import { CollectionNames, PostVerifyStatuses } from '~/interfaces/enums';
import { IPost } from '~/interfaces/IDocument';
import Category from '~/models/category.model';
import Post from '~/models/post.model';
import Ward from '~/models/ward.model';
import {
  getBoolean,
  getIds,
  getLimit,
  getObjectId,
  getOffset,
  getSortBy,
  getSortDirection,
  getValue
} from '~/utils/getter.util';

const PostService = {
  getList: async (dataListFilter: IPostFilter) => {
    const limit = getLimit(dataListFilter.limit);
    const offset = getOffset(dataListFilter.offset);
    const sortBy = getSortBy(dataListFilter.sortBy);
    const sortDirection = getSortDirection(dataListFilter.sortDirection);
    const code = getValue(dataListFilter.code);
    const title = getValue(dataListFilter.title);
    const createdById = getObjectId(dataListFilter.createdById);
    const verifyStatus = getValue(Number(dataListFilter.verifyStatus));
    const createdAtStart = getValue(dataListFilter.createdAtStart);
    const createdAtEnd = getValue(dataListFilter.createdAtEnd);
    const updatedAtStart = getValue(dataListFilter.updatedAtStart);
    const updatedAtEnd = getValue(dataListFilter.updatedAtEnd);
    const categoryIds = getIds(dataListFilter.categoryIds);
    const locationIds = getIds(dataListFilter.locationIds);
    const ownerPhone = getValue(dataListFilter.ownerPhone);
    const isHide = getBoolean(dataListFilter.isHide);

    let pipelineState: PipelineStage[] = [];
    const pipelineStateCount: PipelineStage[] = [];
    const aggregateOptions: AggregateOptions = { collation: { locale: 'vi' } };

    if (title) {
      pipelineState.push({
        $match: {
          $or: [
            { $text: { $search: `"${title}"` } },
            { title: { $regex: new RegExp(title, 'i') } }
          ]
        }
      });
      pipelineStateCount.push({
        $match: {
          $or: [
            { $text: { $search: `"${title}"` } },
            { title: { $regex: new RegExp(title, 'i') } }
          ]
        }
      });
    }

    pipelineState.push({ $match: { isRented: false } });
    pipelineStateCount.push({ $match: { isRented: false } });

    if (code) {
      pipelineState.push({
        $match: { code: { $regex: new RegExp(`^${code}$`, 'i') } }
      });
      pipelineStateCount.push({
        $match: { code: { $regex: new RegExp(`^${code}$`, 'i') } }
      });
    }

    if (createdById) {
      pipelineState.push({ $match: { createdById } });
      pipelineStateCount.push({ $match: { createdById } });
    }

    if (verifyStatus in PostVerifyStatuses) {
      pipelineState.push({ $match: { verifyStatus } });
      pipelineStateCount.push({ $match: { verifyStatus } });
    }

    if (createdAtStart) {
      pipelineState.push({
        $match: { createdAt: { $gte: new Date(createdAtStart) } }
      });
      pipelineStateCount.push({
        $match: { createdAt: { $gte: new Date(createdAtStart) } }
      });
    }

    if (createdAtEnd) {
      pipelineState.push({
        $match: { createdAt: { $lte: new Date(createdAtEnd) } }
      });
      pipelineStateCount.push({
        $match: { createdAt: { $lte: new Date(createdAtEnd) } }
      });
    }

    if (updatedAtStart) {
      pipelineState.push({
        $match: { updatedAt: { $lte: new Date(updatedAtStart) } }
      });
      pipelineStateCount.push({
        $match: { updatedAt: { $lte: new Date(updatedAtStart) } }
      });
    }

    if (updatedAtEnd) {
      pipelineState.push({
        $match: { updatedAt: { $lte: new Date(updatedAtEnd) } }
      });
      pipelineStateCount.push({
        $match: { updatedAt: { $lte: new Date(updatedAtEnd) } }
      });
    }

    if (categoryIds.length) {
      pipelineState.push({
        $match: { categoryId: { $in: categoryIds } }
      });
      pipelineStateCount.push({
        $match: { categoryId: { $in: categoryIds } }
      });
    }

    if (locationIds.length) {
      pipelineState.push({
        $match: { wardId: { $in: locationIds } }
      });
      pipelineStateCount.push({
        $match: { wardId: { $in: locationIds } }
      });
    }

    if (ownerPhone) {
      pipelineState.push({
        $match: { ownerPhone: { $regex: new RegExp(ownerPhone, 'i') } }
      });
      pipelineStateCount.push({
        $match: { ownerPhone: { $regex: new RegExp(ownerPhone, 'i') } }
      });
    }

    if (typeof isHide === DATA_TYPES.BOOLEAN) {
      pipelineState.push({ $match: { isHide } });
      pipelineStateCount.push({ $match: { isHide } });
    }

    pipelineState = pipelineState.concat([
      {
        $lookup: {
          from: CollectionNames.USER,
          localField: 'createdById',
          foreignField: '_id',
          as: 'createdBy'
        }
      },
      {
        $unwind: {
          path: '$createdBy',
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    if (sortBy && sortDirection) {
      pipelineState.push({ $sort: { [sortBy]: sortDirection } });
    }

    if (offset) {
      pipelineState.push({ $skip: offset });
    }

    if (limit) {
      pipelineState.push({ $limit: limit });
    }

    pipelineState = pipelineState.concat([
      {
        $lookup: {
          from: CollectionNames.CATEGORY,
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: CollectionNames.USER,
          localField: 'updatedById',
          foreignField: '_id',
          as: 'updatedBy'
        }
      },
      {
        $unwind: {
          path: '$updatedBy',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: CollectionNames.IMAGE,
          localField: 'imagesId',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: CollectionNames.WARD,
          localField: 'wardId',
          foreignField: '_id',
          as: 'ward'
        }
      },
      {
        $unwind: {
          path: '$ward',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: CollectionNames.DISTRICT,
          localField: 'ward.districtId',
          foreignField: '_id',
          as: 'ward.district'
        }
      },
      {
        $unwind: {
          path: '$ward.district',
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    pipelineStateCount.push({ $count: 'total' });

    const [posts, count] = await Promise.all([
      pipelineState.length
        ? Post.aggregate(pipelineState, aggregateOptions).exec()
        : Post.find().exec(),
      Post.aggregate(pipelineStateCount).exec()
    ]);

    return { data: posts as IPost[], total: count[0]?.total || 0 };
  },
  getRentedList: async (dataListFilter: IPostFilter) => {
    const limit = getLimit(dataListFilter.limit);
    const offset = getOffset(dataListFilter.offset);
    const sortBy = getSortBy(dataListFilter.sortBy);
    const sortDirection = getSortDirection(dataListFilter.sortDirection);
    const code = getValue(dataListFilter.code);
    const title = getValue(dataListFilter.title);
    const createdById = getObjectId(dataListFilter.createdById);
    const verifyStatus = getValue(Number(dataListFilter.verifyStatus));
    const createdAtStart = getValue(dataListFilter.createdAtStart);
    const createdAtEnd = getValue(dataListFilter.createdAtEnd);
    const updatedAtStart = getValue(dataListFilter.updatedAtStart);
    const updatedAtEnd = getValue(dataListFilter.updatedAtEnd);
    const categoryIds = getIds(dataListFilter.categoryIds);
    const locationIds = getIds(dataListFilter.locationIds);
    const ownerPhone = getValue(dataListFilter.ownerPhone);
    const isHide = getBoolean(dataListFilter.isHide);

    let pipelineState: PipelineStage[] = [];
    const pipelineStateCount: PipelineStage[] = [];
    const aggregateOptions: AggregateOptions = { collation: { locale: 'vi' } };

    if (title) {
      pipelineState.push({
        $match: {
          $or: [
            { $text: { $search: `"${title}"` } },
            { title: { $regex: new RegExp(title, 'i') } }
          ]
        }
      });
      pipelineStateCount.push({
        $match: {
          $or: [
            { $text: { $search: `"${title}"` } },
            { title: { $regex: new RegExp(title, 'i') } }
          ]
        }
      });
    }

    pipelineState.push({ $match: { isRented: true } });
    pipelineStateCount.push({ $match: { isRented: true } });

    if (code) {
      pipelineState.push({
        $match: { code: { $regex: new RegExp(`^${code}$`, 'i') } }
      });
      pipelineStateCount.push({
        $match: { code: { $regex: new RegExp(`^${code}$`, 'i') } }
      });
    }

    if (createdById) {
      pipelineState.push({ $match: { createdById } });
      pipelineStateCount.push({ $match: { createdById } });
    }

    if (verifyStatus in PostVerifyStatuses) {
      pipelineState.push({ $match: { verifyStatus } });
      pipelineStateCount.push({ $match: { verifyStatus } });
    }

    if (createdAtStart) {
      pipelineState.push({
        $match: { createdAt: { $gte: new Date(createdAtStart) } }
      });
      pipelineStateCount.push({
        $match: { createdAt: { $gte: new Date(createdAtStart) } }
      });
    }

    if (createdAtEnd) {
      pipelineState.push({
        $match: { createdAt: { $lte: new Date(createdAtEnd) } }
      });
      pipelineStateCount.push({
        $match: { createdAt: { $lte: new Date(createdAtEnd) } }
      });
    }

    if (updatedAtStart) {
      pipelineState.push({
        $match: { updatedAt: { $lte: new Date(updatedAtStart) } }
      });
      pipelineStateCount.push({
        $match: { updatedAt: { $lte: new Date(updatedAtStart) } }
      });
    }

    if (updatedAtEnd) {
      pipelineState.push({
        $match: { updatedAt: { $lte: new Date(updatedAtEnd) } }
      });
      pipelineStateCount.push({
        $match: { updatedAt: { $lte: new Date(updatedAtEnd) } }
      });
    }

    if (categoryIds.length) {
      pipelineState.push({
        $match: { categoryId: { $in: categoryIds } }
      });
      pipelineStateCount.push({
        $match: { categoryId: { $in: categoryIds } }
      });
    }

    if (locationIds.length) {
      pipelineState.push({
        $match: { wardId: { $in: locationIds } }
      });
      pipelineStateCount.push({
        $match: { wardId: { $in: locationIds } }
      });
    }

    if (ownerPhone) {
      pipelineState.push({
        $match: { ownerPhone: { $regex: new RegExp(ownerPhone, 'i') } }
      });
      pipelineStateCount.push({
        $match: { ownerPhone: { $regex: new RegExp(ownerPhone, 'i') } }
      });
    }

    if (typeof isHide === DATA_TYPES.BOOLEAN) {
      pipelineState.push({ $match: { isHide } });
      pipelineStateCount.push({ $match: { isHide } });
    }

    pipelineState = pipelineState.concat([
      {
        $lookup: {
          from: CollectionNames.USER,
          localField: 'createdById',
          foreignField: '_id',
          as: 'createdBy'
        }
      },
      {
        $unwind: {
          path: '$createdBy',
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    if (sortBy && sortDirection) {
      pipelineState.push({ $sort: { [sortBy]: sortDirection } });
    }

    if (offset) {
      pipelineState.push({ $skip: offset });
    }

    if (limit) {
      pipelineState.push({ $limit: limit });
    }

    pipelineState = pipelineState.concat([
      {
        $lookup: {
          from: CollectionNames.CATEGORY,
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: CollectionNames.USER,
          localField: 'updatedById',
          foreignField: '_id',
          as: 'updatedBy'
        }
      },
      {
        $unwind: {
          path: '$updatedBy',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: CollectionNames.IMAGE,
          localField: 'imagesId',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: CollectionNames.WARD,
          localField: 'wardId',
          foreignField: '_id',
          as: 'ward'
        }
      },
      {
        $unwind: {
          path: '$ward',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: CollectionNames.DISTRICT,
          localField: 'ward.districtId',
          foreignField: '_id',
          as: 'ward.district'
        }
      },
      {
        $unwind: {
          path: '$ward.district',
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    pipelineStateCount.push({ $count: 'total' });

    const [posts, count] = await Promise.all([
      pipelineState.length
        ? Post.aggregate(pipelineState, aggregateOptions).exec()
        : Post.find().exec(),
      Post.aggregate(pipelineStateCount).exec() as Promise<[{ total: number }]>
    ]);

    return { data: posts as IPost[], total: count[0]?.total || 0 };
  },
  getById: async (id: string) => {
    const post = await Post.findById(id)
      .populate('category')
      .populate({ path: 'ward', populate: 'district' })
      .populate('createdBy')
      .populate('updatedBy')
      .populate('images')
      .exec();

    if (!post) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return post;
  },
  create: async (post: IPostCreate) => {
    const category = await Category.findById(post.categoryId).exec();

    if (!category) {
      throw new HttpError(
        ERROR_MESSAGES.CATEGORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const ward = await Ward.findById(post.wardId).exec();

    if (!ward) {
      throw new HttpError(ERROR_MESSAGES.WARD_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    const newPost = await Post.create(post);
    return Post.findById(newPost._id)
      .populate('category')
      .populate({ path: 'ward', populate: 'district' })
      .populate('createdBy')
      .populate('updatedBy')
      .populate('images')
      .exec() as Promise<IPost>;
  },
  approve: async (id: string, updatedById: string) => {
    const post = await Post.findById(id).exec();

    if (!post) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (post.verifyStatus === PostVerifyStatuses.APPROVED) {
      throw new HttpError(
        ERROR_MESSAGES.POST_APPROVED_BEFORE,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    return Post.findByIdAndUpdate(
      id,
      {
        $set: {
          verifyStatus: PostVerifyStatuses.APPROVED,
          updatedById,
          denyReason: ''
        }
      },
      { new: true }
    )
      .populate('category')
      .populate({ path: 'ward', populate: 'district' })
      .populate('createdBy')
      .populate('updatedBy')
      .populate('images')
      .exec() as Promise<IPost>;
  },
  deny: async (id: string, reason: string, updatedById: string) => {
    const post = await Post.findById(id).exec();

    if (!post) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (post.verifyStatus === PostVerifyStatuses.DENIED) {
      throw new HttpError(
        ERROR_MESSAGES.POST_DENIED_BEFORE,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    return Post.findByIdAndUpdate(
      id,
      {
        $set: {
          verifyStatus: PostVerifyStatuses.DENIED,
          denyReason: reason,
          updatedById
        }
      },
      { new: true }
    )
      .populate('category')
      .populate({ path: 'ward', populate: 'district' })
      .populate('createdBy')
      .populate('updatedBy')
      .populate('images')
      .exec() as Promise<IPost>;
  },
  markAsRented: async (id: string, updatedById: string) => {
    const post = await Post.findById(id).exec();

    if (!post) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return Post.findByIdAndUpdate(
      id,
      { $set: { isRented: true, rentedAt: Date.now, updatedById } },
      { new: true }
    )
      .populate('category')
      .populate({ path: 'ward', populate: 'district' })
      .populate('createdBy')
      .populate('updatedBy')
      .populate('images')
      .exec() as Promise<IPost>;
  },
  updateById: async (id: string, postUpdate: IPostUpdate) => {
    const post = await Post.findById(id).exec();

    if (!post) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    const category = await Category.findById(post.categoryId).exec();

    if (!category) {
      throw new HttpError(
        ERROR_MESSAGES.CATEGORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const ward = await Ward.findById(post.wardId).exec();

    if (!ward) {
      throw new HttpError(ERROR_MESSAGES.WARD_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    const postParams: any = postUpdate;
    if (post.isRented !== postUpdate.isRented) {
      if (postUpdate.isRented) {
        postParams.rentedAt = Date.now;
      } else {
        postParams.openedForRentAt = Date.now;
      }
    }

    return Post.findByIdAndUpdate(id, { $set: postParams }, { new: true })
      .populate('category')
      .populate({ path: 'ward', populate: 'district' })
      .populate('createdBy')
      .populate('updatedBy')
      .populate('images')
      .exec() as Promise<IPost>;
  }
};

export default PostService;
