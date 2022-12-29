import { SchemaOptions, Segments, Joi } from 'celebrate'

export const UPDATE_INFO_RULES: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    fullName: Joi.string(),
    avatar: Joi.string()
  })
}

export const CHANGE_PASSWORD_RULES: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    newPassword: Joi.string()
  })
}
