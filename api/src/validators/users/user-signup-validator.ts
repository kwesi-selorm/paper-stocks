import joi, { ValidationError } from 'joi'
import { Request, Response, NextFunction } from 'express'
import { UserSignUpInput } from '../../utils/types'

const passwordRegex = new RegExp(
  '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
)

const schema = joi.object({
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
  const { error } = schema.validate(req.body)
  if (error) {
    if (error instanceof ValidationError) {
      const errorMessages = error.details.map((e) => e.message).join(', ')
      return res.status(400).json({ Error: errorMessages })
    }
    throw new Error('Request input validation failed')
  }
  next()
}
