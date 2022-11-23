import { Request, Response } from 'express';
import { success } from '~/helpers/commonResponse';
import { mapCategoryToResponse } from '~/helpers/mapDataToResponse';
import { ICategoryFilter, ICategoryRequest } from '~/interfaces';
import CategoryService from '~/services/category.service';

const CategoryController = {
  getList: async (req: Request, res: Response) => {
    const dataListFilter: ICategoryFilter = req.query;
    const { total, data } = await CategoryService.getList(dataListFilter);
    return success(res, { total, data: data.map(mapCategoryToResponse) });
  },
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const category = await CategoryService.getById(id);
    return success(res, { data: mapCategoryToResponse(category) });
  },
  create: async (req: Request, res: Response) => {
    const categoryRequest: ICategoryRequest = req.body;
    const category = await CategoryService.create(categoryRequest);
    return success(res, { data: mapCategoryToResponse(category) });
  },
  updateById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const categoryUpdate: ICategoryRequest = req.body;
    const category = await CategoryService.updateById(id, categoryUpdate);
    return success(res, { data: mapCategoryToResponse(category) });
  }
};

export default CategoryController;
