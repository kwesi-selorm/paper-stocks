import joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { UserSignInInput } from '../../utils/types'
import { handleSchemaErrors } from './handle-schema-errors'

const signInInputSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(8).required()
})

export default function validateUserSignInInput(
  req: Request<UserSignInInput>,
  res: Response,
  next: NextFunction
) {
  const { error } = signInInputSchema.validate(req.body)
  handleSchemaErrors(error, res)
  next()
}
