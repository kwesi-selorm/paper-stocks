import { userIdParamSchema } from '../joi-schema'
import { Request } from 'express'
import { ValidationError } from 'joi'

export function validateGetAssetsInput(req: Request) {
  const { error } = userIdParamSchema.validate(req.params)
  if (error instanceof ValidationError) {
    return error.details.map((e) => e.message).join(', ')
  }
}
