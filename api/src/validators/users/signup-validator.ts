import joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { UserSignUpInput } from '../../utils/types'
import { handleSchemaErrors } from './handle-schema-errors'

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/

const signUpSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().required(),
  password: joi.string().pattern(passwordRegex).min(8).required().messages({
    'string.pattern.base':
      'The password must have at least: one uppercase letter, one lowercase letter, one number, and one special character'
  }),
  confirmPassword: joi.ref('password'),
  passwordClue: joi.string()
})

export default function validateUserSignUpInput(
  req: Request<UserSignUpInput>,
  res: Response,
  next: NextFunction
) {
  const { error } = signUpSchema.validate(req.body)
  handleSchemaErrors(error, res)
  next()
}
