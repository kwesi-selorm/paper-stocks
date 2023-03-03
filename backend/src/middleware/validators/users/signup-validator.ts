import { NextFunction, Request, Response } from 'express'
import { handleSchemaErrors } from '../handle-schema-errors'
import { signUpInputSchema } from '../joi-schema'

export default function validateSignUpInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = signUpInputSchema.validate(req.body)
  handleSchemaErrors(error, res)
  return next()
}
