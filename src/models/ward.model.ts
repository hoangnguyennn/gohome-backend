import { Schema, model } from 'mongoose'
import { CollectionNames, WardTypes } from '~/interfaces/enums'
import { IWard } from '~/interfaces/IDocument'

const wardSchema = new Schema<IWard>(
  {
    name: { type: String, required: true, index: true },
    type: { type: String, enum: WardTypes, required: true },
    districtId: { type: Schema.Types.ObjectId, required: true },
    isHide: { type: Boolean, default: false },
    deletedAt: { type: Date, required: false }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

wardSchema.index({ name: 'text' })

wardSchema.virtual('district', {
  ref: CollectionNames.DISTRICT,
  localField: 'districtId',
  foreignField: '_id',
  justOne: true
})

export default model<IWard>(CollectionNames.WARD, wardSchema)
