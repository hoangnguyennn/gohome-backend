import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import {
  IDataListFilter,
  IPostCreate,
  IPostFilter,
  IPostUpdate
} from '~/interfaces';
import { PostVerifyStatuses } from '~/interfaces/enums';
import { IPost } from '~/interfaces/IDocument';
import Post from '~/models/post.model';
import {
  getIds,
  getLimit,
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
    const createdById = getValue(dataListFilter.createdById);
    const verifyStatus = getValue(dataListFilter.verifyStatus);
    const createdAtStart = getValue(dataListFilter.createdAtStart);
    const createdAtEnd = getValue(dataListFilter.createdAtEnd);
    const updatedAtStart = getValue(dataListFilter.updatedAtStart);
    const updatedAtEnd = getValue(dataListFilter.updatedAtEnd);
    const categoryIds = getIds(dataListFilter.categoryIds);
    const locationIds = getIds(dataListFilter.locationIds);
    const ownerPhone = getValue(dataListFilter.ownerPhone);

    let query = Post.find({ isRented: false })
      .collation({ locale: 'en' })
      .sort({ verifyStatus: 1, createdAt: 1 });
    let queryCount = Post.find({ isRented: false });

    if (code) {
      query = query.find({ code: new RegExp(`^${code}$`, 'i') });
      queryCount = queryCount.find({ code: new RegExp(`^${code}$`, 'i') });
    }

    if (title) {
      query = query.find({ title: new RegExp(title, 'i') });
      queryCount = queryCount.find({ title: new RegExp(title, 'i') });
    }

    if (createdById) {
      query = query.find({ createdById });
      queryCount = queryCount.find({ createdById });
    }

    if (verifyStatus) {
      query = query.find({ verifyStatus });
      queryCount = queryCount.find({ verifyStatus });
    }

    if (createdAtStart) {
      query = query.find({ createdAt: { $gte: new Date(createdAtStart) } });
      queryCount = queryCount.find({
        createdAt: { $gte: new Date(createdAtStart) }
      });
    }

    if (createdAtEnd) {
      query = query.find({ createdAt: { $lte: new Date(createdAtEnd) } });
      queryCount = queryCount.find({
        createdAt: { $lte: new Date(createdAtEnd) }
      });
    }

    if (updatedAtStart) {
      query = query.find({ updatedAt: { $gte: new Date(updatedAtStart) } });
      queryCount = queryCount.find({
        updatedAt: { $gte: new Date(updatedAtStart) }
      });
    }

    if (updatedAtEnd) {
      query = query.find({ updatedAt: { $lte: new Date(updatedAtEnd) } });
      queryCount = queryCount.find({
        updatedAt: { $lte: new Date(updatedAtEnd) }
      });
    }

    if (categoryIds.length) {
      query = query.find({ categoryId: { $in: categoryIds } });
      queryCount = queryCount.find({ categoryId: { $in: categoryIds } });
    }

    if (locationIds.length) {
      query = query.find({ wardId: { $in: locationIds } });
      queryCount = queryCount.find({ wardId: { $in: locationIds } });
    }

    if (ownerPhone) {
      query = query.find({ ownerPhone: new RegExp(ownerPhone, 'i') });
      queryCount = queryCount.find({ ownerPhone: new RegExp(ownerPhone, 'i') });
    }

    if (sortBy && sortDirection) {
      query = query
        .collation({ locale: 'en' })
        .sort({ [sortBy]: sortDirection });
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.skip(offset);
    }

    const [posts, total] = await Promise.all([
      query
        .populate('category')
        .populate({ path: 'ward', populate: 'district' })
        .populate('createdBy')
        .populate('updatedBy')
        .populate('images')
        .exec(),
      queryCount.lean().count().exec()
    ]);

    return { data: posts, total };
  },
  getRentedList: async (dataListFilter: IDataListFilter<IPost>) => {
    const limit = getLimit(dataListFilter.limit);
    const offset = getOffset(dataListFilter.offset);
    const sortBy = getSortBy(dataListFilter.sortBy);
    const sortDirection = getSortDirection(dataListFilter.sortDirection);

    let query = Post.find()
      .collation({ locale: 'en' })
      .sort({ verifyStatus: 1, createdAt: 1 });

    if (sortBy && sortDirection) {
      query = query
        .collation({ locale: 'en' })
        .sort({ [sortBy]: sortDirection });
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.skip(offset);
    }

    const [posts, total] = await Promise.all([
      query
        .find({ isRented: true })
        .populate('category')
        .populate({ path: 'ward', populate: 'district' })
        .populate('createdBy')
        .populate('updatedBy')
        .populate('images')
        .exec(),
      Post.find({ isRented: true }).lean().count().exec()
    ]);

    return { data: posts, total };
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
        'Bài đăng đã được phê duyệt trước đó',
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
        'Bài đăng đã bị từ chối trước đó',
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
