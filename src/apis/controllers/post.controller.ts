import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import { mapPostToResponse } from '~/helpers/mapDataToResponse';
import {
  IPostCreate,
  IPostFilter,
  IPostRequest,
  IPostUpdate,
  ITokenPayload
} from '~/interfaces';
import { PostVerifyStatuses } from '~/interfaces/enums';
import PostService from '~/services/post.service';

const PostController = {
  getList: async (req: Request, res: Response) => {
    const dataListFilter: IPostFilter = req.query;
    const { total, data } = await PostService.getList(dataListFilter);
    return success(res, { total, data: data.map(mapPostToResponse) });
  },
  getRentedList: async (req: Request, res: Response) => {
    const dataListFilter: IPostFilter = req.query;
    const { total, data } = await PostService.getRentedList(dataListFilter);
    return success(res, { total, data: data.map(mapPostToResponse) });
  },
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await PostService.getById(id);
    return success(res, { data: mapPostToResponse(post) });
  },
  create: async (req: Request, res: Response) => {
    const { userId } = req.user as ITokenPayload;
    const postRequest: IPostRequest = req.body;

    const postCreate: IPostCreate = {
      ...postRequest,
      verifyStatus: PostVerifyStatuses.PENDING,
      createdById: userId
    };

    const newPost = await PostService.create(postCreate);
    return success(res, { data: mapPostToResponse(newPost) });
  },
  approve: async (req: Request, res: Response) => {
    const { userId } = req.user as ITokenPayload;
    const { id } = req.params;
    const post = await PostService.approve(id, userId);
    return success(res, { data: mapPostToResponse(post) });
  },
  deny: async (req: Request, res: Response) => {
    const { userId } = req.user as ITokenPayload;
    const { id } = req.params;
    const { reason } = req.body;
    const post = await PostService.deny(id, reason, userId);
    return success(res, { data: mapPostToResponse(post) });
  },
  markAsRented: async (req: Request, res: Response) => {
    const { userId } = req.user as ITokenPayload;
    const { id } = req.params;
    const post = await PostService.markAsRented(id, userId);
    return success(res, { data: mapPostToResponse(post) });
  },
  updateById: async (req: Request, res: Response) => {
    const { userId } = req.user as ITokenPayload;
    const { id } = req.params;
    const postRequest: IPostRequest = req.body;

    const postUpdate: IPostUpdate = {
      ...postRequest,
      verifyStatus: PostVerifyStatuses.PENDING,
      updatedById: userId
    };

    const post = await PostService.updateById(id, postUpdate);
    return success(res, { data: mapPostToResponse(post) });
  }
};

export default PostController;
