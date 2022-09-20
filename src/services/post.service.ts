import { IPostCreate } from '~/interfaces';
import Post from '~/models/post.model';

const PostService = {
  getList: () => {
    return Post.find()
      .populate('category')
      .populate({ path: 'ward', populate: 'district' })
      .populate('createdBy')
      .populate('updatedBy')
      .populate('images');
  },
  create: async (post: IPostCreate) => {
    const newPost = await Post.create(post);
    return Post.findById(newPost._id)
      .populate('category')
      .populate({ path: 'ward', populate: 'district' })
      .populate('createdBy')
      .populate('updatedBy')
      .populate('images');
  }
};

export default PostService;
