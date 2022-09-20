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
  create: async (req: Request, res: Response) => {
    const categoryRequest: ICategoryRequest = req.body;
    const category = await CategoryService.create(categoryRequest);
    return success(res, { category: mapCategoryToResponse(category) });
  }
};

export default CategoryController;
