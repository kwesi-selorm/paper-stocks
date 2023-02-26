import { Request } from 'express'
import { handleSchemaErrors } from '../handle-schema-errors'
import { signUpInputSchema } from '../joi-schema'

export default function validateUserSignUpInput(req: Request) {
  const { error } = signUpInputSchema.validate(req.body)
  return handleSchemaErrors(error)
}
