import { NextFunction, Request, Response } from 'express'
import { handleSchemaErrors } from '../handle-schema-errors'
import { signInInputSchema } from '../joi-schema'

export default function validateSignInInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = signInInputSchema.validate(req.body)
  handleSchemaErrors(error, res)
  return next()
}
