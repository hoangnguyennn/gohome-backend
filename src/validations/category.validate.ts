import { SchemaOptions, Segments, Joi } from 'celebrate';

export const CATEGORY_CREATION_RULES: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required()
  })
};

export const CATEGORY_UPDATE_RULES: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required()
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
};
