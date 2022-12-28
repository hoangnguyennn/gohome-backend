import { SchemaOptions, Segments, Joi } from 'celebrate';

export const POST_CREATION_RULES: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    categoryId: Joi.string().required(),
    wardId: Joi.string().required(),
    price: Joi.number().required(),
    commission: Joi.number().required(),
    acreage: Joi.number().required(),
    bedroom: Joi.number().required(),
    bathroom: Joi.number().required(),
    floor: Joi.number().required(),
    description: Joi.string().required(),
    ownerName: Joi.string().required(),
    ownerPhone: Joi.string().required(),
    ownerAddress: Joi.string().required(),
    isCheap: Joi.boolean().required(),
    isFeatured: Joi.boolean().required(),
    isRented: Joi.boolean(),
    imagesId: Joi.array().items(Joi.string().required())
  })
};

export const POST_UPDATE_RULES: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    categoryId: Joi.string().required(),
    wardId: Joi.string().required(),
    price: Joi.number().required(),
    commission: Joi.number().required(),
    acreage: Joi.number().required(),
    bedroom: Joi.number().required(),
    bathroom: Joi.number().required(),
    floor: Joi.number().required(),
    description: Joi.string().required(),
    ownerName: Joi.string().required(),
    ownerPhone: Joi.string().required(),
    ownerAddress: Joi.string().required(),
    isCheap: Joi.boolean().required(),
    isFeatured: Joi.boolean().required(),
    isRented: Joi.boolean(),
    imagesId: Joi.array().items(Joi.string().required())
  })
};
