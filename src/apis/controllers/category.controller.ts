import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import { mapCategoryToResponse } from '~/helpers/mapDataToResponse';
import { ICategoryRequest } from '~/interfaces';
import CategoryService from '~/services/category.service';

const CategoryController = {
  getList: async (req: Request, res: Response) => {
    const categories = await CategoryService.getList();
    return success(res, { categories: categories.map(mapCategoryToResponse) });
  },
  getById: async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const category = await CategoryService.getById(id);
    return success(res, { category: mapCategoryToResponse(category) });
  },
  create: async (req: Request, res: Response) => {
    const categoryRequest: ICategoryRequest = req.body;
    const category = await CategoryService.create(categoryRequest);
    return success(res, { category: mapCategoryToResponse(category) });
  },
  updateById: async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const categoryUpdate: ICategoryRequest = req.body;
    const category = await CategoryService.updateById(id, categoryUpdate);
    return success(res, { category: mapCategoryToResponse(category) });
  }
};

export default CategoryController;
