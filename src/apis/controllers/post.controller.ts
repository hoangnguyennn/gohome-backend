import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import { mapPostToResponse } from '~/helpers/mapDataToResponse';
import { IPostCreate, IPostRequest } from '~/interfaces';
import { PostVerifyStatuses } from '~/interfaces/enums';
import CategoryService from '~/services/category.service';
import PostService from '~/services/post.service';
import { getPostCode, getSlug } from '~/utils/converter';

const PostController = {
  getList: async (req: Request, res: Response) => {
    const posts = await PostService.getList();
    return success(res, { posts: posts.map(mapPostToResponse) });
  },
  create: async (req: Request, res: Response) => {
    const { userId } = req.user;
    const postRequest: IPostRequest = req.body;
    const category = await CategoryService.getById(postRequest.categoryId);

    const postCreate: IPostCreate = {
      ...postRequest,
      code: getPostCode(category),
      slug: getSlug(postRequest.title),
      verifyStatus: PostVerifyStatuses.PENDING,
      createdById: userId
    };

    await CategoryService.increaseCount(category._id);
    const newPost = await PostService.create(postCreate);

    return success(res, { post: mapPostToResponse(newPost) });
  }
};

export default PostController;
