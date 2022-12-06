import { AggregateOptions } from 'mongodb';
import { PipelineStage } from 'mongoose';
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

    const pipelineState: PipelineStage[] = [];
    const pipelineStateCount: PipelineStage[] = [];
    const aggregateOptions: AggregateOptions = { collation: { locale: 'vi' } };

    if (name) {
      pipelineState.push({
        $match: {
          $or: [
            { $text: { $search: `"${name}"` } },
            { name: { $regex: new RegExp(name, 'i') } }
          ]
        }
      });
      pipelineStateCount.push({
        $match: {
          $or: [
            { $text: { $search: `"${name}"` } },
            { name: { $regex: new RegExp(name, 'i') } }
          ]
        }
      });
    }

    if (code) {
      pipelineState.push({ $match: { code } });
      pipelineStateCount.push({ $match: { code } });
    }

    if (sortBy && sortDirection) {
      pipelineState.push({ $sort: { [sortBy]: sortDirection } });
    }

    if (offset) {
      pipelineState.push({ $skip: offset });
    }

    if (limit) {
      pipelineState.push({ $limit: limit });
    }

    pipelineStateCount.push({ $count: 'total' });

    const [categories, [{ total }]] = await Promise.all([
      pipelineState.length
        ? Category.aggregate(pipelineState, aggregateOptions).exec()
        : Category.find().exec(),
      Category.aggregate(pipelineStateCount).exec() as Promise<
        [{ total: number }]
      >
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
