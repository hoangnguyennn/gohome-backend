import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { ICategoryRequest } from '~/interfaces';
import Category from '~/models/category.model';

const CategoryService = {
  getList: () => {
    return Category.find().sort('name');
  },
  getById: async (id: string) => {
    const category = await Category.findById(id);

    if (!category) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return category;
  },
  create: (category: ICategoryRequest) => {
    return Category.create(category);
  },
  update: () => {
    console.log('update');
  },
  increaseCount: (id: string) => {
    return Category.findByIdAndUpdate(
      id,
      { $inc: { count: 1 } },
      { new: true }
    );
  },
  delete: () => {
    console.log('delete');
  },
  hide: () => {
    console.log('hide');
  }
};

export default CategoryService;
