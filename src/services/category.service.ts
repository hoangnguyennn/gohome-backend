import { DATA_LIST_LIMIT_DEFAULT } from '~/constants';
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { ICategoryRequest, IDataListFilter } from '~/interfaces';
import Category from '~/models/category.model';

const CategoryService = {
  getList: async (dataListFilter: IDataListFilter) => {
    const limit = dataListFilter.limit || DATA_LIST_LIMIT_DEFAULT;
    const offset = dataListFilter.offset || 0;

    const categories = await Category.find()
      .limit(limit)
      .skip(offset)
      .sort('name')
      .exec();

    const total = await Category.find().lean().count().exec();

    return { data: categories, total };
  },
  getById: async (id: string) => {
    const category = await Category.findById(id).exec();

    if (!category) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return category;
  },
  create: (category: ICategoryRequest) => {
    return Category.create(category);
  },
  updateById: async (id: string, categoryUpdate: ICategoryRequest) => {
    const category = await Category.findByIdAndUpdate(
      id,
      { $set: categoryUpdate },
      { new: true }
    ).exec();

    if (!category) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return category;
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
