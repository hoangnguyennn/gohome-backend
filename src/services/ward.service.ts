import { AggregateOptions } from 'mongodb';
import { PipelineStage } from 'mongoose';
import { ERROR_MESSAGES } from '~/constants/errorMessages';
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse';
import { IWardFilter, IWardRequest } from '~/interfaces';
import { CollectionNames } from '~/interfaces/enums';
import { IWard } from '~/interfaces/IDocument';
import District from '~/models/district.model';
import Ward from '~/models/ward.model';
import {
  getLimit,
  getOffset,
  getSortBy,
  getSortDirection,
  getValue
} from '~/utils/getter.util';

const WardService = {
  getList: async (dataListFilter: IWardFilter) => {
    const limit = getLimit(dataListFilter.limit);
    const offset = getOffset(dataListFilter.offset);
    const sortBy = getSortBy(dataListFilter.sortBy);
    const sortDirection = getSortDirection(dataListFilter.sortDirection);
    const name = getValue(dataListFilter.name);
    const type = getValue(dataListFilter.type);
    const districtId = getValue(dataListFilter.districtId);

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

    if (type) {
      pipelineState.push({ $match: { type } });
      pipelineStateCount.push({ $match: { type } });
    }

    if (districtId) {
      pipelineState.push({ $match: { districtId } });
      pipelineStateCount.push({ $match: { districtId } });
    }

    pipelineState.push({
      $lookup: {
        from: CollectionNames.DISTRICT,
        localField: 'districtId',
        foreignField: '_id',
        as: 'district'
      }
    });
    pipelineState.push({
      $unwind: {
        path: '$district',
        preserveNullAndEmptyArrays: true
      }
    });

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

    const [wards, [{ total }]] = await Promise.all([
      Ward.aggregate(pipelineState, aggregateOptions).exec(),
      Ward.aggregate(pipelineStateCount).exec() as Promise<[{ total: number }]>
    ]);

    return { data: wards as IWard[], total };
  },
  getById: async (id: string) => {
    const ward = await Ward.findById(id).populate('district').exec();

    if (!ward) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return ward;
  },
  create: async (ward: IWardRequest) => {
    const district = await District.findById(ward.districtId).exec();

    if (!district) {
      throw new HttpError(
        ERROR_MESSAGES.DISTRICT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return (await Ward.create(ward)).populate('district');
  },
  updateById: async (id: string, wardUpdate: IWardRequest) => {
    const district = await District.findById(wardUpdate.districtId).exec();

    if (!district) {
      throw new HttpError(
        ERROR_MESSAGES.DISTRICT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const ward = await Ward.findByIdAndUpdate(
      id,
      { $set: wardUpdate },
      { new: true }
    )
      .populate('district')
      .exec();

    if (!ward) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return ward;
  },
  delete: () => {
    console.log('delete');
  },
  hide: () => {
    console.log('hide');
  }
};

export default WardService;
