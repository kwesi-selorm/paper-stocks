import joi from 'joi'

export const buyAssetInputSchema = joi.object({
  name: joi.string().required(),
  symbol: joi.string().required(),
  position: joi.number().required(),
  lastPrice: joi.number().required()
})

export const signInInputSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(8).required()
})

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/
export const signUpInputSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().required().min(3),
  password: joi.string().pattern(passwordRegex).min(8).required().messages({
    'string.pattern.base':
      'The password must have at least: one uppercase letter, one lowercase letter, one number, and one special character'
  }),
  confirmPassword: joi.ref('password'),
  passwordClue: joi.string()
})

export const userIdParamSchema = joi.object({
  userId: joi.string().required()
})
