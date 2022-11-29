import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { ICategoryFilter, ICategoryRequest } from '~/interfaces';
import Category from '~/models/category.model';
import {
  getLimit,
  getOffset,
  getSortBy,
  getSortDirection,
  getValue
} from '~/utils/getter.util';

const CategoryService = {
  getList: async (dataListFilter: ICategoryFilter) => {
    const limit = getLimit(dataListFilter.limit);
    const offset = getOffset(dataListFilter.offset);
    const sortBy = getSortBy(dataListFilter.sortBy);
    const sortDirection = getSortDirection(dataListFilter.sortDirection);
    const name = getValue(dataListFilter.name);
    const code = getValue(dataListFilter.code);

    let query = Category.find().collation({ locale: 'en' }).sort('name');
    let queryCount = Category.find();

    if (name) {
      query = query.find({ name: new RegExp(name, 'i') });
      queryCount = queryCount.find({ name: new RegExp(name, 'i') });
    }

    if (code) {
      query = query.find({ code: new RegExp(code, 'i') });
      queryCount = queryCount.find({ code: new RegExp(code, 'i') });
    }

    if (sortBy && sortDirection) {
      query = query
        .collation({ locale: 'en' })
        .sort({ [sortBy]: sortDirection });
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.skip(offset);
    }

    const [categories, total] = await Promise.all([
      query.exec(),
      queryCount.lean().count().exec()
    ]);

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
    ).exec();
  },
  delete: () => {
    console.log('delete');
  },
  hide: () => {
    console.log('hide');
  }
};

export default CategoryService;
