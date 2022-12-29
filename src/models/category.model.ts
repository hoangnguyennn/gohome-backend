import { Schema, model } from 'mongoose'
import { CollectionNames } from '~/interfaces/enums'
import { ICategory } from '~/interfaces/IDocument'

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, index: true },
    code: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
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

categorySchema.index({ name: 'text' })

export default model<ICategory>(CollectionNames.CATEGORY, categorySchema)
