import { Schema, model } from 'mongoose';
import { CollectionNames, PostVerifyStatuses } from '~/interfaces/enums';
import { IPost } from '~/interfaces/IDocument';

const postSchema = new Schema<IPost>(
  {
    code: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, required: true },
    wardId: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    commission: { type: Number, required: true },
    acreage: { type: Number, required: true },
    bedroom: { type: Number, required: false },
    bathroom: { type: Number, required: false },
    floor: { type: Number, required: false },
    description: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    ownerAddress: { type: String, required: true },
    verifyStatus: { type: Number, enum: PostVerifyStatuses, required: true },
    denyReason: { type: String, required: false },
    isCheap: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isRented: { type: Boolean, default: false },
    isHide: { type: Boolean, default: false },
    createdById: { type: Schema.Types.ObjectId, required: true },
    updatedById: { type: Schema.Types.ObjectId, required: false },
    hiddenAt: { type: String, required: false },
    shownAt: { type: String, default: new Date().toString() },
    imagesId: [{ type: Schema.Types.ObjectId, required: true }],
    deletedAt: { type: String, required: false }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

postSchema.virtual('category', {
  ref: CollectionNames.CATEGORY,
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
});

postSchema.virtual('ward', {
  ref: CollectionNames.WARD,
  localField: 'wardId',
  foreignField: '_id',
  justOne: true
});

postSchema.virtual('createdBy', {
  ref: CollectionNames.USER,
  localField: 'createdById',
  foreignField: '_id',
  justOne: true
});

postSchema.virtual('updatedBy', {
  ref: CollectionNames.USER,
  localField: 'updatedById',
  foreignField: '_id',
  justOne: true
});

postSchema.virtual('images', {
  ref: CollectionNames.IMAGE,
  localField: 'imagesId',
  foreignField: '_id',
  justOne: false
});

export default model<IPost>(CollectionNames.POST, postSchema);
