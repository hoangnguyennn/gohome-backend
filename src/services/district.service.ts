import { PipelineStage } from 'mongoose'
import {
  COMMON_MESSAGE,
  HttpError,
  HTTP_STATUS
} from '~/helpers/commonResponse'
import { IDistrictFilter, IDistrictRequest } from '~/interfaces'
import { IDistrict } from '~/interfaces/IDocument'
import District from '~/models/district.model'
import Ward from '~/models/ward.model'
import {
  getLimit,
  getOffset,
  getSortBy,
  getSortDirection,
  getValue
} from '~/utils/getter.util'

const DistrictService = {
  getList: async (dataListFilter: IDistrictFilter) => {
    const limit = getLimit(dataListFilter.limit)
    const offset = getOffset(dataListFilter.offset)
    const sortBy = getSortBy(dataListFilter.sortBy)
    const sortDirection = getSortDirection(dataListFilter.sortDirection)
    const name = getValue(dataListFilter.name)
    const type = getValue(dataListFilter.type)

    const pipelineState: PipelineStage[] = []
    const pipelineStateCount: PipelineStage[] = []

    if (name) {
      pipelineState.push({
        $match: {
          $or: [
            { $text: { $search: `"${name}"` } },
            { name: { $regex: new RegExp(name, 'i') } }
          ]
        }
      })
      pipelineStateCount.push({
        $match: {
          $or: [
            { $text: { $search: `"${name}"` } },
            { name: { $regex: new RegExp(name, 'i') } }
          ]
        }
      })
    }

    if (type) {
      pipelineState.push({ $match: { type } })
      pipelineStateCount.push({ $match: { type } })
    }

    if (sortBy && sortDirection) {
      pipelineState.push({ $sort: { [sortBy]: sortDirection } })
    }

    if (offset) {
      pipelineState.push({ $skip: offset })
    }

    if (limit) {
      pipelineState.push({ $limit: limit })
    }

    pipelineStateCount.push({ $count: 'total' })

    const [districts, count] = await Promise.all([
      pipelineState.length
        ? District.aggregate(pipelineState, {
            collation: { locale: 'vi' }
          }).exec()
        : District.find().exec(),
      District.aggregate(pipelineStateCount).exec()
    ])

    return { data: districts as IDistrict[], total: count[0]?.total || 0 }
  },
  getById: async (id: string) => {
    const district = await District.findById(id).exec()

    if (!district) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    }

    return district
  },
  create: (district: IDistrictRequest) => {
    return District.create(district)
  },
  updateById: async (id: string, districtUpdate: IDistrictRequest) => {
    const district = await District.findByIdAndUpdate(
      id,
      { $set: districtUpdate },
      { new: true }
    ).exec()

    if (!district) {
      throw new HttpError(COMMON_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    }

    return district
  },
  delete: () => {
    console.log('delete')
  },
  hide: () => {
    console.log('hide')
  },
  getWards: (districtId: string) => {
    return Ward.find({ districtId: districtId }).exec()
  }
}

export default DistrictService
