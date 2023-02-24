import joi, { ValidationError } from 'joi'
import { Request, Response, NextFunction } from 'express'
import { UserSignInInput } from '../../utils/types'

const schema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(8).required()
})

export default function validateUserSignInInput(
  req: Request<UserSignInInput>,
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
