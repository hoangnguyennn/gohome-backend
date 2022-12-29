import { SchemaOptions, Segments, Joi } from 'celebrate'

export const LOGIN_RULES: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}

export const REGISTER_RULES: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}
