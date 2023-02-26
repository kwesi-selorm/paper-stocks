import { Request } from 'express'
import { handleSchemaErrors } from '../handle-schema-errors'
import { signInInputSchema } from '../joi-schema'

export default function validateUserSignInInput(req: Request) {
  const { error } = signInInputSchema.validate(req.body)
  return handleSchemaErrors(error)
}
