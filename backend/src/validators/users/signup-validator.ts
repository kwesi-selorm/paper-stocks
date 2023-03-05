import { Request } from 'express'
import { signUpInputSchema } from '../joi-schema'

export default function validateSignUpInput(req: Request) {
  const { error } = signUpInputSchema.validate(req.body)
  return error
}
