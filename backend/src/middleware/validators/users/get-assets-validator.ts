import { userIdParamSchema } from '../joi-schema'
import { NextFunction, Request, Response } from 'express'
import { handleSchemaErrors } from '../handle-schema-errors'

export function validateGetAssetsInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = userIdParamSchema.validate(req.params)
  handleSchemaErrors(error, res)
  next()
}
