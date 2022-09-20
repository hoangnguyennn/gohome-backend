import { ICategoryRequest } from '~/interfaces';
import Category from '~/models/category.model';

const CategoryService = {
  getList: () => {
    return Category.find();
  },
  create: (category: ICategoryRequest) => {
    return Category.create(category);
  },
  update: () => {
    console.log('update');
  },
  delete: () => {
    console.log('delete');
  },
  hide: () => {
    console.log('hide');
  }
};

export default CategoryService;
