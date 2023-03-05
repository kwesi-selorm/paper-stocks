import { Request } from 'express'
import { signInInputSchema } from '../joi-schema'
import { ValidationError } from 'joi'

export default function validateSignInInput(req: Request) {
  const { error } = signInInputSchema.validate(req.body)
  if (error instanceof ValidationError) {
    return error.details.map((e) => e.message).join(', ')
  }
}
