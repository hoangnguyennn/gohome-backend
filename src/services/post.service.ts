import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IPostCreate, IPostUpdate } from '~/interfaces';
import { PostVerifyStatuses } from '~/interfaces/enums';
import Post from '~/models/post.model';

const PostService = {
  getList: () => {
    return Post.find({ isRented: false })
      .sort({ verifyStatus: 1, createdAt: 1 })
      .populate('category')
      .populate({ path: 'ward', populate: 'district' })
      .populate('createdBy')
      .populate('updatedBy')
      .populate('images')
      .exec();
  },
  getRentedList: () => {
    return Post.find({ isRented: true })
      .sort({ verifyStatus: 1, createdAt: 1 })
      .populate('category')
      .populate({ path: 'ward', populate: 'district' })
      .populate('createdBy')
      .populate('updatedBy')
      .populate('images')
      .exec();
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
      .populate('images');
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
      .populate('images');
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
      .populate('images');
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
      .populate('images');
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
      .exec();
  }
};

export default PostService;
