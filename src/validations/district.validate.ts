import { SchemaOptions, Segments, Joi } from 'celebrate'

export const DISTRICT_CREATION_RULES: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required()
  })
}

export const DISTRICT_UPDATE_RULES: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required()
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}
