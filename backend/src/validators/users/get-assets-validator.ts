import { userIdParamSchema } from '../joi-schema'
import { Request } from 'express'
import { handleSchemaErrors } from '../handle-schema-errors'

export function validateGetAssetsInput(req: Request) {
  const { error } = userIdParamSchema.validate(req.params)
  return handleSchemaErrors(error)
}
