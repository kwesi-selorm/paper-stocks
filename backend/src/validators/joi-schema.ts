import joi from 'joi'
import * as dotenv from 'dotenv'
dotenv.config()

//TODO: Add a validator for the user id length in params

export const buyAssetInputSchema = joi.object({
  name: joi.string().required(),
  symbol: joi.string().required(),
  position: joi.number().required(),
  lastPrice: joi.number().required()
})

export const signInInputSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(8).required(),
  token: joi.string().required()
})

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/
export const signUpInputSchema = joi.object({
  email:
    process.env.NODE_ENV === 'development'
      ? joi.string().required()
      : joi.string().email().required(),
  username: joi.string().required().min(3),
  password: joi.string().pattern(passwordRegex).min(8).required().messages({
    'string.pattern.base':
      'The password must have at least: one uppercase letter, one lowercase letter, one number, and one special character'
  }),
  confirmPassword: joi.ref('password'),
  passwordClue: joi.string().allow('').optional(),
  token: joi.string()
})

export const userIdParamSchema = joi.object({
  userId: joi.string().required()
})

export const getStockPriceInputSchema = joi.object({
  tickers: joi.array().items(joi.string())
})
