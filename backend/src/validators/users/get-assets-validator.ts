import { userIdParamSchema } from '../joi-schema'
import { Request } from 'express'

export function validateGetAssetsInput(req: Request) {
  const { error } = userIdParamSchema.validate(req.params)
  return error
}
